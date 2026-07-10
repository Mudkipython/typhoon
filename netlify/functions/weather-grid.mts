function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function wrapLon(value: number) {
  return ((value + 540) % 360) - 180;
}

function numberParam(url: URL, key: string, fallback: number) {
  const value = Number(url.searchParams.get(key));
  return Number.isFinite(value) ? value : fallback;
}

export default async (request: Request) => {
  const url = new URL(request.url);
  const centerLat = clamp(numberParam(url, "lat", 20), -75, 75);
  const centerLon = wrapLon(numberParam(url, "lon", 125));
  const span = clamp(numberParam(url, "span", 12), 5, 22);
  const size = 7;
  const latitudes: number[] = [];
  const longitudes: number[] = [];

  for (let row = 0; row < size; row += 1) {
    const lat = clamp(centerLat - span + (row * span * 2) / (size - 1), -80, 80);
    for (let col = 0; col < size; col += 1) {
      const lon = wrapLon(centerLon - span * 1.25 + (col * span * 2.5) / (size - 1));
      latitudes.push(Number(lat.toFixed(3)));
      longitudes.push(Number(lon.toFixed(3)));
    }
  }

  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.searchParams.set("latitude", latitudes.join(","));
  endpoint.searchParams.set("longitude", longitudes.join(","));
  endpoint.searchParams.set("current", "cloud_cover,precipitation,wind_speed_10m,wind_direction_10m");
  endpoint.searchParams.set("wind_speed_unit", "ms");
  endpoint.searchParams.set("cell_selection", "nearest");
  endpoint.searchParams.set("timezone", "GMT");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Typhoon-Vision/17" },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Open-Meteo returned ${response.status}`);
    }

    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : [payload];
    const cells = rows.map((entry: any, index: number) => ({
      lat: Number(entry.latitude ?? latitudes[index]),
      lon: Number(entry.longitude ?? longitudes[index]),
      cloudCover: Number(entry.current?.cloud_cover ?? 0),
      precipitation: Number(entry.current?.precipitation ?? 0),
      windSpeed: Number(entry.current?.wind_speed_10m ?? 0),
      windDirection: Number(entry.current?.wind_direction_10m ?? 0),
      time: entry.current?.time ?? null,
    }));

    return Response.json(
      {
        provider: "Open-Meteo",
        generatedAt: new Date().toISOString(),
        centre: { lat: centerLat, lon: centerLon },
        span,
        cells,
        note: "Cloud cover and precipitation are numerical weather-model fields, not ground-radar reflectivity.",
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        error: "weather_grid_unavailable",
        message: error instanceof Error ? error.message : String(error),
        generatedAt: new Date().toISOString(),
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
};

export const config = {
  path: "/api/weather-grid",
};
