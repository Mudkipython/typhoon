import type { Config } from "@netlify/functions";

const API_TIMEOUT_MS = 7000;

async function fetchTimed(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Typhoon-Vision/1.0 (+https://typhoon-vision.netlify.app)",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function isoDay(offsetDays = 0): string {
  return new Date(Date.now() + offsetDays * 86400_000).toISOString().slice(0, 10);
}

export default async () => {
  let radar: Record<string, unknown> = {
    status: "offline",
    host: null,
    frames: [],
    generatedAt: null,
  };

  try {
    const json: any = await (await fetchTimed("https://api.rainviewer.com/public/weather-maps.json")).json();
    const host = typeof json?.host === "string" ? json.host : "https://tilecache.rainviewer.com";
    const past = Array.isArray(json?.radar?.past) ? json.radar.past : [];
    const frames = past
      .slice(-12)
      .map((frame: any) => ({
        time: Number(frame.time),
        path: String(frame.path || ""),
        tileTemplate: `${host}${String(frame.path || "")}/256/{z}/{x}/{y}/2/1_1.png`,
      }))
      .filter((frame: any) => Number.isFinite(frame.time) && frame.path);

    radar = {
      status: frames.length ? "online" : "no-data",
      host,
      frames,
      generatedAt: Number.isFinite(Number(json?.generated))
        ? new Date(Number(json.generated) * 1000).toISOString()
        : null,
      coverageTemplate: `${host}/v2/coverage/0/256/{z}/{x}/{y}/0/0_0.png`,
      documentation: "https://www.rainviewer.com/api/weather-maps-api.html",
    };
  } catch (error) {
    radar = {
      status: "offline",
      host: null,
      frames: [],
      generatedAt: null,
      message: String(error),
      documentation: "https://www.rainviewer.com/api/weather-maps-api.html",
    };
  }

  // GIBS WMS uses nearestValue=1. Supplying yesterday's UTC date avoids the
  // common situation where today's daily composite is only partially processed.
  const satelliteDate = isoDay(-1);
  const satelliteLayer = "VIIRS_SNPP_CorrectedReflectance_TrueColor";
  const satellite = {
    status: "online",
    provider: "NASA GIBS",
    layer: satelliteLayer,
    date: satelliteDate,
    wmsTemplate:
      `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi` +
      `?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1` +
      `&LAYERS=${satelliteLayer}&STYLES=&FORMAT=image/jpeg&TRANSPARENT=FALSE` +
      `&HEIGHT=256&WIDTH=256&SRS=EPSG:3857&BBOX={bbox-epsg-3857}` +
      `&TIME=${satelliteDate}`,
    fallbackDates: [isoDay(-2), isoDay(-3)],
    acknowledgement: "NASA GIBS / ESDIS",
    documentation: "https://nasa-gibs.github.io/gibs-api-docs/access-basics/",
  };

  return new Response(
    JSON.stringify({ generatedAt: new Date().toISOString(), radar, satellite }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
};

export const config: Config = { path: "/api/weather-layers" };
