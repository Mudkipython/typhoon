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


function nearestTagText(block: string, tag: string) {
  return textOf(block, `jmx_eb:${tag}`) || textOf(block, tag);
}
function extractJmaTrackPoints(xml: string): TrackPoint[] {
  const points: TrackPoint[] = [];
  const coordinateRegex = /<(?:jmx_eb:)?Coordinate([^>]*)>([^<]+)<\/(?:jmx_eb:)?Coordinate>/gi;
  for (const match of xml.matchAll(coordinateRegex)) {
    const attrs = match[1] || "";
    const index = match.index || 0;
    const beforeInfo = Math.max(xml.lastIndexOf("<MeteorologicalInfo", index), xml.lastIndexOf("<Item", index), 0);
    const afterMeteorological = xml.indexOf("</MeteorologicalInfo>", index);
    const afterItem = xml.indexOf("</Item>", index);
    const candidates = [afterMeteorological, afterItem].filter((value) => value > index);
    const afterInfo = candidates.length ? Math.min(...candidates) + 24 : Math.min(xml.length, index + 2200);
    const block = xml.slice(beforeInfo, afterInfo);
    if (!/中心位置|center position|center/i.test(attrs + block)) continue;
    const coordinate = parseJmaCoordinate(match[2]);
    if (!coordinate) continue;
    const localIndex = index - beforeInfo;
    const dateMatches = [...block.matchAll(/<(?:jmx_eb:)?DateTime([^>]*)>([^<]+)<\/(?:jmx_eb:)?DateTime>/gi)];
    const precedingDates = dateMatches.filter((item) => (item.index || 0) <= localIndex);
    const dateMatch = precedingDates.at(-1) || dateMatches[0];
    const dateAttrs = dateMatch?.[1] || "";
    const time = dateMatch?.[2]?.trim() || null;
    const infoOpenEnd = block.indexOf(">");
    const infoContext = infoOpenEnd >= 0 ? block.slice(0, infoOpenEnd + 1) : "";
    const nearContext = xml.slice(Math.max(0, index - 900), Math.min(xml.length, index + 900));
    const forecastContext = `${attrs} ${dateAttrs} ${infoContext} ${nearestTagText(block, "Kind")} ${nearContext}`;
    const explicitlyForecast = /中心位置[（(]?予報|予報円|予報時刻|forecast\s*(position|time)|type=["'][^"']*予報/i.test(forecastContext);
    const explicitlyObserved = /実況時刻|解析時刻|中心位置[（(]?実況|observation\s*time|analysis\s*time|type=["'][^"']*実況/i.test(`${attrs} ${dateAttrs} ${nearContext}`);
    const forecast = explicitlyForecast && !explicitlyObserved;
    const windValues = [...block.matchAll(/<(?:jmx_eb:)?WindSpeed[^>]*>([^<]+)<\/(?:jmx_eb:)?WindSpeed>/gi)].map((m) => Number.parseFloat(m[1])).filter(Number.isFinite);
    const pressureValues = [...block.matchAll(/<(?:jmx_eb:)?Pressure[^>]*>([^<]+)<\/(?:jmx_eb:)?Pressure>/gi)].map((m) => Number.parseFloat(m[1])).filter(Number.isFinite);
    points.push({
      ...coordinate,
      time,
      windMs: windValues.length ? Math.max(...windValues) : null,
      pressureHpa: pressureValues.length ? Math.min(...pressureValues) : null,
      forecast,
      source: "jma"
    });
  }
  return sortAndDedupeTrack(points);
}

async function readNHC(): Promise<{ source: SourceStatus; storms: Storm[] }> {
  const url = "https://www.nhc.noaa.gov/CurrentStorms.json";
  try {
    const json: any = await (await fetchTimed(url)).json();
    const rows = Array.isArray(json?.activeStorms) ? json.activeStorms : [];
    const storms = rows.map((item: any, index: number) => {
      const lat = parseCardinal(item.latitude ?? item.lat);
      const lon = parseCardinal(item.longitude ?? item.lon);
      if (lat == null || lon == null) return null;
      const windKph = Number(item.windSpeedKph);
      const windMph = Number(item.windSpeedMph ?? item.intensity ?? item.windSpeed);
      const windMs = Number.isFinite(windKph) ? windKph / 3.6 : Number.isFinite(windMph) ? windMph * 0.44704 : null;
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
        windMs,
        pressureHpa: Number.isFinite(pressure) ? pressure : null,
        track: [{ lat, lon, time: updatedAt, windMs, pressureHpa: Number.isFinite(pressure) ? pressure : null, forecast: false, source: "nhc" }],
        sources: ["nhc"]
      } satisfies Storm;
    }).filter(Boolean) as Storm[];
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
      .slice(0, 14);

    const parsed = await Promise.all(entries.map(async (entry, index) => {
      if (!entry.href) return null;
      try {
        const xml = await (await fetchTimed(entry.href)).text();
        const points = extractJmaTrackPoints(xml);
        const fallbackCoordinate = parseJmaCoordinate(textOf(xml, "jmx_eb:Coordinate") || textOf(xml, "Coordinate"));
        const track = sortAndDedupeTrack(points.length ? points : (fallbackCoordinate ? [{ ...fallbackCoordinate, source: "jma", forecast: false } as TrackPoint] : []));
        const current = [...track].filter((point) => !point.forecast).sort((a, b) => pointTime(b) - pointTime(a))[0] || track[0];
        if (!current) return null;
        const identity = normalizeJmaIdentity(xml, entry.title, index);
        return {
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
        } satisfies Storm;
      } catch {
        return null;
      }
    }));
    const storms = parsed.filter(Boolean) as Storm[];

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
      if (p.iscurrent === true || p.iscurrent === "true") return true;
      const end = new Date(p.todate || p.toDate || 0).getTime();
      const start = new Date(p.fromdate || p.fromDate || 0).getTime();
      const now = Date.now();
      return Number.isFinite(end) && end >= now - 36 * 3600_000 && (!Number.isFinite(start) || start <= now + 10 * 86400_000);
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


function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function readPAGASA(): Promise<{ source: SourceStatus; storms: Storm[]; advisory: any | null }> {
  const url = "https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin";
  try {
    const html = await (await fetchTimed(url, { headers: { Accept: "text/html,*/*" } })).text();
    const text = htmlToText(html);
    const nameMatch = text.match(/(?:Typhoon|Tropical Storm|Severe Tropical Storm|Tropical Depression)\s+["“']?([A-Z][A-Z-]{2,})["”']?/i);
    const coordMatch = text.match(/\((\d+(?:\.\d+)?)\s*°?\s*([NS])\s*,\s*(\d+(?:\.\d+)?)\s*°?\s*([EW])\s*\)/i);
    const windMatch = text.match(/Maximum sustained winds of\s*(\d+(?:\.\d+)?)\s*km\/h/i);
    const movementMatch = text.match(/Moving\s+([A-Za-z -]+?)\s+at\s+(\d+(?:\.\d+)?)\s*km\/h/i);
    const issuedMatch = text.match(/Issued at\s+([^()]+?)(?:\(|“|\")/i);
    const advisory = {
      title: nameMatch?.[0] || null,
      name: nameMatch?.[1]?.toUpperCase() || null,
      movement: movementMatch ? `${movementMatch[1].trim()} at ${movementMatch[2]} km/h` : null,
      windKph: windMatch ? Number(windMatch[1]) : null,
      issued: issuedMatch?.[1]?.trim() || null,
      hazards: {
        severeWind: /Severe Winds/i.test(text),
        heavyRain: /Heavy Rainfall/i.test(text),
        coastal: /HAZARDS AFFECTING COASTAL WATERS|Storm Surge/i.test(text)
      }
    };
    const storms: Storm[] = [];
    if (nameMatch && coordMatch) {
      const lat = Number(coordMatch[1]) * (/S/i.test(coordMatch[2]) ? -1 : 1);
      const lon = Number(coordMatch[3]) * (/W/i.test(coordMatch[4]) ? -1 : 1);
      const windMs = windMatch ? Number(windMatch[1]) / 3.6 : null;
      storms.push({
        id: `pagasa-${advisory.name || "active"}`,
        name: advisory.name || "PAGASA-TC",
        basin: "Western North Pacific",
        classification: nameMatch[0].replace(/["“”']/g, ""),
        lat, lon,
        updatedAt: new Date().toISOString(),
        windMs,
        pressureHpa: null,
        track: [{ lat, lon, time: new Date().toISOString(), windMs, pressureHpa: null, forecast: false, source: "pagasa" }],
        sources: ["pagasa"]
      });
    }
    const messageParts = [advisory.title, advisory.movement, advisory.windKph ? `${advisory.windKph} km/h` : null].filter(Boolean);
    return {
      source: {
        id: "pagasa", name: "PAGASA", role: "local",
        status: storms.length ? "online" : "no-data", updatedAt: new Date().toISOString(),
        message: messageParts.join(" · ") || "Bulletin page online; no active cyclone parsed",
        url, items: storms.length
      },
      storms,
      advisory
    };
  } catch (error) {
    return { source: { id: "pagasa", name: "PAGASA", role: "local", status: "offline", message: String(error), url }, storms: [], advisory: null };
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
  const [nhc, jma, gdacs, hko, pagasa] = await Promise.all([readNHC(), readJMA(), readGDACS(), readHKO(), readPAGASA()]);
  const storms = mergeStorms([jma.storms, nhc.storms, pagasa.storms, gdacs.storms]);
  const sources = [jma.source, nhc.source, pagasa.source, gdacs.source, hko.source, {
    id: "cwa", name: "Taiwan CWA", role: "optional", status: "not-configured",
    message: "Reserved for a licensed/API-key data connector", url: "https://opendata.cwa.gov.tw/"
  } satisfies SourceStatus];

  const body = {
    generatedAt: new Date().toISOString(),
    live: true,
    storms,
    sources,
    localWarnings: [
      ...(hko.warning ? [{ source: "hko", region: "Hong Kong", ...hko.warning }] : []),
      ...(pagasa.advisory ? [{ source: "pagasa", region: "Philippines", ...pagasa.advisory }] : [])
    ],
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
