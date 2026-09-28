import axios from "axios";

// Open-Meteo needs no API key. Completely free.
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

// Open-Meteo's free geocoding API (no key needed)
const OPEN_METEO_GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export type ChartData = {
  label: string;
  value: number;
};

interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface GeoResponse {
  results?: GeoResult[];
}

interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// ==============================
// City name -> coordinates (free, no key)
// ==============================

export async function getCityCoordinates(
  city: string,
): Promise<{ lat: number; lon: number; name: string }> {
  const response = await axios.get<GeoResponse>(OPEN_METEO_GEO_URL, {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  console.log("Geocoding response:", response.data);

  if (!response.data.results || !response.data.results.length) {
    throw new Error(`City not found: ${city}`);
  }

  const { latitude, longitude, name, country } = response.data.results[0];

  return { lat: latitude, lon: longitude, name: `${name}, ${country}` };
}

// ==============================
// 14-day chart data by city name
// ==============================

export async function getChartData(
  city: string,
  days: number = 14,
  language: "en" | "fa" = "en",
): Promise<ChartData[]> {
  // 1. Resolve city name -> coordinates
  const { lat, lon } = await getCityCoordinates(city);

  // 2. Fetch 14 days of daily max temperature
  const response = await axios.get<OpenMeteoResponse>(OPEN_METEO_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: "temperature_2m_max,temperature_2m_min",
      forecast_days: days,
      timezone: "auto",
    },
  });

  console.log("Open-Meteo raw response:", response.data);

  const { time, temperature_2m_max } = response.data.daily;

  const locale = language === "fa" ? "fa-IR" : "en-US";

  const result: ChartData[] = time.map((dateStr, i) => {
    const date = new Date(dateStr);
    const label = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
    }).format(date);

    return {
      label,
      value: Math.round(temperature_2m_max[i]),
    };
  });

  console.log("Chart data:", result);
  return result;
}
