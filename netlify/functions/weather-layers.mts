import type { Config } from "@netlify/functions";

const API_TIMEOUT_MS = 7000;

async function fetchTimed(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Typhoon-Vision/16 (+https://typhoon-vision.netlify.app)",
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
    provider: "RainViewer public API",
    requiresAuthentication: false,
    host: null,
    frames: [],
    generatedAt: null,
  };

  try {
    const json: any = await (await fetchTimed("https://api.rainviewer.com/public/weather-maps.json")).json();
    const host = typeof json?.host === "string" ? json.host : "https://tilecache.rainviewer.com";
    const past = Array.isArray(json?.radar?.past) ? json.radar.past : [];
    const nowcast = Array.isArray(json?.radar?.nowcast) ? json.radar.nowcast : [];
    const frames = [...past, ...nowcast]
      .slice(-18)
      .map((frame: any) => ({
        time: Number(frame.time),
        path: String(frame.path || ""),
        // RainViewer's documented order is z/x/y.
        tileTemplate: `${host}${String(frame.path || "")}/256/{z}/{x}/{y}/2/1_1.png`,
      }))
      .filter((frame: any) => Number.isFinite(frame.time) && frame.path);

    radar = {
      status: frames.length ? "online" : "no-data",
      provider: "RainViewer public API",
      requiresAuthentication: false,
      host,
      frames,
      generatedAt: Number.isFinite(Number(json?.generated))
        ? new Date(Number(json.generated) * 1000).toISOString()
        : null,
      coverageTemplate: `${host}/v2/coverage/0/256/{z}/{x}/{y}/0/0_0.png`,
      maxZoom: 7,
      documentation: "https://www.rainviewer.com/api/weather-maps-api.html",
    };
  } catch (error) {
    radar = {
      status: "offline",
      provider: "RainViewer public API",
      requiresAuthentication: false,
      host: null,
      frames: [],
      generatedAt: null,
      message: String(error),
      documentation: "https://www.rainviewer.com/api/weather-maps-api.html",
    };
  }

  // Daily true-colour composites can be incomplete on the current UTC date.
  // Two days ago is intentionally used for a reliable public demonstration layer.
  const satelliteDate = isoDay(-2);
  const satelliteLayer = "MODIS_Terra_CorrectedReflectance_TrueColor";
  const satellite = {
    status: "online",
    provider: "NASA GIBS",
    requiresAuthentication: false,
    layer: satelliteLayer,
    date: satelliteDate,
    // GIBS WMTS REST uses row before column, hence {y}/{x}.
    tileTemplate:
      `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${satelliteLayer}` +
      `/default/${satelliteDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    fallbackDates: [isoDay(-3), isoDay(-4)],
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
