const API_TIMEOUT_MS = 6500;

async function fetchTimed(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Typhoon-Vision/1.0 (+https://typhoon-vision.netlify.app)",
        Accept: "application/json"
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function utcDateOffset(days: number) {
  const date = new Date(Date.now() + days * 86400_000);
  return date.toISOString().slice(0, 10);
}

export default async () => {
  let radar: any = { status: "offline", host: null, frames: [], generatedAt: null };
  try {
    const json: any = await (await fetchTimed("https://api.rainviewer.com/public/weather-maps.json")).json();
    const frames = [
      ...(Array.isArray(json?.radar?.past) ? json.radar.past : []),
      ...(Array.isArray(json?.radar?.nowcast) ? json.radar.nowcast : [])
    ].slice(-18).map((frame: any) => ({
      time: Number(frame.time),
      path: String(frame.path || "")
    })).filter((frame: any) => Number.isFinite(frame.time) && frame.path);
    radar = {
      status: frames.length ? "online" : "no-data",
      host: typeof json?.host === "string" ? json.host : "https://tilecache.rainviewer.com",
      frames,
      generatedAt: Number.isFinite(Number(json?.generated)) ? new Date(Number(json.generated) * 1000).toISOString() : null,
      coverageTemplate: "https://tilecache.rainviewer.com/v2/coverage/0/256/{z}/{x}/{y}/0/0_0.png"
    };
  } catch (error) {
    radar = { status: "offline", host: null, frames: [], generatedAt: null, message: String(error) };
  }

  const body = {
    generatedAt: new Date().toISOString(),
    radar,
    satellite: {
      status: "online",
      provider: "NASA GIBS",
      layer: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
      date: utcDateOffset(-1),
      tileMatrixSet: "GoogleMapsCompatible_Level9",
      tileTemplate: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/{date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
      acknowledgement: "NASA GIBS / ESDIS"
    }
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
    }
  });
};

export const config = { path: "/api/weather-layers" };
