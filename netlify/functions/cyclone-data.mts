const API_TIMEOUT_MS = 7200;

type SourceStatus = {
  id: string;
  name: string;
  role: "primary" | "official" | "impact" | "local" | "optional";
  status: "online" | "no-data" | "degraded" | "offline" | "not-configured";
  updatedAt?: string | null;
  message?: string;
  url: string;
  items?: number;
};

type TrackPoint = {
  lat: number;
  lon: number;
  time?: string | null;
  windMs?: number | null;
  pressureHpa?: number | null;
  forecast?: boolean;
  source: string;
};

type Storm = {
  id: string;
  name: string;
  localName?: string;
  japaneseName?: string;
  number?: string;
  productTitle?: string;
  basin?: string;
  classification?: string;
  alertLevel?: string;
  lat: number;
  lon: number;
  updatedAt?: string | null;
  windMs?: number | null;
  pressureHpa?: number | null;
  track: TrackPoint[];
  sources: string[];
};

async function fetchTimed(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": "Typhoon-Vision/1.0 (+https://typhoon-vision.netlify.app)",
        "Accept": "application/json, application/xml, text/xml, */*",
        ...(init.headers || {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function textOf(xml: string, tag: string) {
  const safe = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${safe}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${safe}>`, "i"));
  if (!match) return "";
  return match[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function numberOf(xml: string, tag: string) {
  const raw = textOf(xml, tag);
  const n = Number.parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseCardinal(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const match = value.trim().match(/^([+-]?\d+(?:\.\d+)?)\s*([NSEW])?$/i);
  if (!match) return null;
  let n = Number(match[1]);
  if (/^[SW]$/i.test(match[2] || "")) n *= -1;
  return Number.isFinite(n) ? n : null;
}

function parseJmaCoordinate(value: string) {
  const match = value.match(/([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)/);
  if (!match) return null;
  const lat = Number(match[1]);
  const lon = Number(match[2]);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
}

function xmlEntries(feed: string) {
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => {
    const block = match[1];
    const href = block.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] || "";
    return {
      title: textOf(block, "title"),
      updated: textOf(block, "updated"),
      href
    };
  });
}

function normalizeJmaIdentity(xml: string, entryTitle: string, fallbackIndex: number) {
  const rawName = [
    textOf(xml, "jmx_eb:TyphoonNamePart"), textOf(xml, "TyphoonNamePart"),
    textOf(xml, "jmx_eb:TyphoonName"), textOf(xml, "TyphoonName"), entryTitle
  ].filter(Boolean).join(" · ");
  const exclusions = new Set(["TYPHOON", "TROPICAL", "CYCLONE", "FORECAST", "ANALYSIS", "INFORMATION", "JMA", "RSMC", "TOKYO", "UTC", "WMO"]);
  const latin = (rawName.match(/\b[A-Z][A-Z-]{2,}\b/g) || []).find((item) => !exclusions.has(item)) || "";
  const japaneseName = rawName.match(/[ァ-ヶー]{3,}/)?.[0] || "";
  const taggedNumber = textOf(xml, "jmx_eb:TyphoonNumber") || textOf(xml, "TyphoonNumber");
  const number = taggedNumber || entryTitle.match(/(?:^|\D)(\d{4})(?:\D|$)/)?.[1] || `jma-${fallbackIndex}`;
  return {
    name: latin || `JMA-${String(number).replace(/\D/g, "") || fallbackIndex + 1}`,
    japaneseName: japaneseName || undefined,
    number: String(number),
    productTitle: entryTitle
  };
}
function pointTime(point: TrackPoint) {
  const time = point.time ? new Date(point.time).getTime() : Number.NaN;
  return Number.isFinite(time) ? time : 0;
}
function sortAndDedupeTrack(points: TrackPoint[]) {
  const sorted = [...points].sort((a, b) => pointTime(a) - pointTime(b));
  const output: TrackPoint[] = [];
  for (const point of sorted) {
    const duplicate = output.find((item) => Math.abs(item.lat - point.lat) < 0.015 && Math.abs(item.lon - point.lon) < 0.015 && (item.time || "") === (point.time || ""));
    if (!duplicate) output.push(point);
  }
  return output;
}

async function readNHC(): Promise<{ source: SourceStatus; storms: Storm[] }> {
  const url = "https://www.nhc.noaa.gov/CurrentStorms.json";
  try {
    const json: any = await (await fetchTimed(url)).json();
    const rows = Array.isArray(json?.activeStorms) ? json.activeStorms : [];
    const storms = rows.map((item: any, index: number) => {
      const lat = parseCardinal(item.latitude ?? item.lat) ?? 0;
      const lon = parseCardinal(item.longitude ?? item.lon) ?? 0;
      const wind = Number(item.windSpeedMph ?? item.intensity ?? item.windSpeed);
      const pressure = Number(item.pressure);
      const updatedAt = item.lastUpdate ?? item.lastUpdateDate ?? item.updateTime ?? null;
      return {
        id: String(item.id ?? item.binNumber ?? `nhc-${index}`),
        name: String(item.name ?? "Unnamed"),
        basin: String(item.basin ?? item.id ?? "NHC"),
        classification: String(item.classification ?? item.type ?? "Tropical cyclone"),
        lat,
        lon,
        updatedAt,
        // NHC fields vary by product. Keep wind null unless a clearly named metric field is present.
        windMs: Number.isFinite(Number(item.windSpeedKph)) ? Number(item.windSpeedKph) / 3.6 : null,
        pressureHpa: Number.isFinite(pressure) ? pressure : null,
        track: [{ lat, lon, time: updatedAt, windMs: null, pressureHpa: Number.isFinite(pressure) ? pressure : null, forecast: false, source: "nhc" }],
        sources: ["nhc"]
      } satisfies Storm;
    });
    return {
      source: {
        id: "nhc", name: "NOAA / NHC", role: "official",
        status: storms.length ? "online" : "no-data", updatedAt: new Date().toISOString(),
        message: storms.length ? "Active NHC systems loaded" : "Feed online; no active Atlantic/E Pacific systems",
        url, items: storms.length
      },
      storms
    };
  } catch (error) {
    return { source: { id: "nhc", name: "NOAA / NHC", role: "official", status: "offline", message: String(error), url }, storms: [] };
  }
}

async function readJMA(): Promise<{ source: SourceStatus; storms: Storm[] }> {
  const feedUrl = "https://www.data.jma.go.jp/developer/xml/feed/extra.xml";
  try {
    const feed = await (await fetchTimed(feedUrl)).text();
    const entries = xmlEntries(feed)
      .filter((entry) => /台風|熱帯低気圧|Typhoon|Tropical Cyclone/i.test(entry.title))
      .slice(0, 5);

    const storms: Storm[] = [];
    for (const [index, entry] of entries.entries()) {
      if (!entry.href) continue;
      try {
        const xml = await (await fetchTimed(entry.href)).text();
        const blocks = [...xml.matchAll(/<MeteorologicalInfo[\s\S]*?<\/MeteorologicalInfo>/gi)].map((m) => m[0]);
        const points: TrackPoint[] = [];
        for (const block of blocks) {
          const rawCoordinate = textOf(block, "jmx_eb:Coordinate") || textOf(block, "Coordinate");
          const coordinate = parseJmaCoordinate(rawCoordinate);
          if (!coordinate) continue;
          const wind = numberOf(block, "jmx_eb:WindSpeed") ?? numberOf(block, "WindSpeed");
          const pressure = numberOf(block, "jmx_eb:Pressure") ?? numberOf(block, "Pressure");
          const time = textOf(block, "jmx_eb:DateTime") || textOf(block, "DateTime") || null;
          points.push({ ...coordinate, time, windMs: wind, pressureHpa: pressure, forecast: /予報|forecast/i.test(block), source: "jma" });
        }
        const fallbackCoordinate = parseJmaCoordinate(textOf(xml, "jmx_eb:Coordinate") || textOf(xml, "Coordinate"));
        const track = sortAndDedupeTrack(points.length ? points : (fallbackCoordinate ? [{ ...fallbackCoordinate, source: "jma", forecast: false } as TrackPoint] : []));
        const current = [...track].filter((point) => !point.forecast).sort((a, b) => pointTime(b) - pointTime(a))[0] || track[0];
        if (!current) continue;
        const identity = normalizeJmaIdentity(xml, entry.title, index);
        storms.push({
          id: `jma-${identity.number}`,
          name: identity.name,
          localName: identity.japaneseName,
          japaneseName: identity.japaneseName,
          number: identity.number,
          productTitle: identity.productTitle,
          basin: "Western North Pacific",
          classification: textOf(xml, "jmx_eb:ClassPart") || textOf(xml, "ClassPart") || "Tropical cyclone",
          lat: current.lat,
          lon: current.lon,
          updatedAt: textOf(xml, "ReportDateTime") || entry.updated || null,
          windMs: current.windMs ?? null,
          pressureHpa: current.pressureHpa ?? null,
          track,
          sources: ["jma"]
        });
      } catch {
        // Feed remains useful even if an individual bulletin cannot be parsed.
      }
    }

    return {
      source: {
        id: "jma", name: "JMA / RSMC Tokyo", role: "primary",
        status: entries.length ? (storms.length ? "online" : "degraded") : "no-data",
        updatedAt: entries[0]?.updated || new Date().toISOString(),
        message: entries.length ? `${entries.length} tropical-cyclone bulletin entries found` : "Feed online; no matching bulletin",
        url: feedUrl, items: storms.length
      },
      storms
    };
  } catch (error) {
    return { source: { id: "jma", name: "JMA / RSMC Tokyo", role: "primary", status: "offline", message: String(error), url: feedUrl }, storms: [] };
  }
}

async function readGDACS(): Promise<{ source: SourceStatus; storms: Storm[] }> {
  const url = "https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?eventlist=TC";
  try {
    const json: any = await (await fetchTimed(url)).json();
    const features = Array.isArray(json?.features) ? json.features : [];
    const active = features.filter((feature: any) => {
      const p = feature?.properties || {};
      return p.iscurrent === true || p.iscurrent === "true" || p.eventtype === "TC";
    }).slice(0, 12);
    const storms = active.map((feature: any, index: number) => {
      const p = feature.properties || {};
      const coords = feature.geometry?.type === "Point" ? feature.geometry.coordinates : p?.centroid?.coordinates;
      const lon = Number(coords?.[0]);
      const lat = Number(coords?.[1]);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
      return {
        id: `gdacs-${p.eventid ?? index}`,
        name: String(p.eventname ?? p.name ?? `TC ${p.eventid ?? index}`),
        basin: String(p.country ?? p.episodeid ?? "Global"),
        classification: String(p.severitydata?.severitytext ?? p.severity ?? "Tropical cyclone"),
        alertLevel: String(p.alertlevel ?? p.episodealertlevel ?? "green").toLowerCase(),
        lat, lon,
        updatedAt: p.todate ?? p.fromdate ?? null,
        windMs: null,
        pressureHpa: null,
        track: [{ lat, lon, time: p.todate ?? p.fromdate ?? null, source: "gdacs", forecast: false }],
        sources: ["gdacs"]
      } satisfies Storm;
    }).filter(Boolean) as Storm[];
    return {
      source: {
        id: "gdacs", name: "GDACS / EU JRC & UN", role: "impact",
        status: storms.length ? "online" : "no-data", updatedAt: new Date().toISOString(),
        message: storms.length ? "Global impact records loaded" : "API online; no current TC impact record",
        url, items: storms.length
      },
      storms
    };
  } catch (error) {
    return { source: { id: "gdacs", name: "GDACS", role: "impact", status: "offline", message: String(error), url }, storms: [] };
  }
}

async function readHKO(): Promise<{ source: SourceStatus; warning: any | null }> {
  const url = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en";
  try {
    const json: any = await (await fetchTimed(url)).json();
    const warning = json?.WTCSGNL ?? null;
    return {
      source: {
        id: "hko", name: "Hong Kong Observatory", role: "local",
        status: warning ? "online" : "no-data", updatedAt: warning?.updateTime ?? new Date().toISOString(),
        message: warning ? `${warning.type || warning.name || warning.code}` : "API online; no Hong Kong TC signal",
        url, items: warning ? 1 : 0
      },
      warning
    };
  } catch (error) {
    return { source: { id: "hko", name: "Hong Kong Observatory", role: "local", status: "offline", message: String(error), url }, warning: null };
  }
}

function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const toRad = (v: number) => v * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const q = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
}

function mergeStorms(groups: Storm[][]) {
  const merged: Storm[] = [];
  for (const storm of groups.flat()) {
    const match = merged.find((candidate) => {
      const sameName = candidate.name.toLowerCase() === storm.name.toLowerCase();
      return sameName || distanceKm(candidate, storm) < 180;
    });
    if (!match) {
      merged.push({ ...storm, track: [...storm.track], sources: [...storm.sources] });
      continue;
    }
    match.sources = [...new Set([...match.sources, ...storm.sources])];
    match.track.push(...storm.track.filter((point) => !match.track.some((existing) => distanceKm(existing, point) < 8 && existing.time === point.time)));
    match.track = sortAndDedupeTrack(match.track);
    if (match.sources[0] !== "jma" && storm.sources.includes("jma")) {
      match.lat = storm.lat; match.lon = storm.lon; match.windMs = storm.windMs; match.pressureHpa = storm.pressureHpa; match.updatedAt = storm.updatedAt;
      match.name = storm.name; match.localName = storm.localName; match.japaneseName = storm.japaneseName; match.number = storm.number;
    }
    if (!match.alertLevel && storm.alertLevel) match.alertLevel = storm.alertLevel;
  }
  for (const storm of merged) storm.track = sortAndDedupeTrack(storm.track);
  return merged;
}

export default async () => {
  const [nhc, jma, gdacs, hko] = await Promise.all([readNHC(), readJMA(), readGDACS(), readHKO()]);
  const storms = mergeStorms([jma.storms, nhc.storms, gdacs.storms]);
  const sources = [jma.source, nhc.source, gdacs.source, hko.source, {
    id: "cwa", name: "Taiwan CWA", role: "optional", status: "not-configured",
    message: "Reserved for a licensed/API-key data connector", url: "https://opendata.cwa.gov.tw/"
  } satisfies SourceStatus];

  const body = {
    generatedAt: new Date().toISOString(),
    live: true,
    storms,
    sources,
    localWarnings: hko.warning ? [{ source: "hko", region: "Hong Kong", ...hko.warning }] : [],
    methodology: {
      primaryRule: "Use the responsible RSMC or national meteorological service as the authoritative source for each basin/region.",
      comparisonRule: "Compare location, update time and reported intensity; do not average agency warnings or classifications.",
      caution: "Agencies can use different wind averaging periods and classification systems. Differences are displayed, not silently merged."
    }
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
    }
  });
};

export const config = { path: "/api/cyclones" };
