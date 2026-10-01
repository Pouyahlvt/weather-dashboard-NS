import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

// ==============================
// CURRENT WEATHER
// ==============================

export type OpenWeatherResponse = {
  name: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  wind: {
    speed: number;
  };
};

export async function getCurrentWeather(
  city: string,
  language: "en" | "fa" = "en",
) {
  const response = await axios.get<OpenWeatherResponse>(WEATHER_API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: language,
    },
  });

  return response.data;
}

// ==============================
// GEOCODING (city name -> lat/lon)
// ==============================

interface GeoResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export async function getCoordinates(
  city: string,
): Promise<{ lat: number; lon: number; name: string }> {
  const response = await axios.get<GeoResult[]>(GEO_API_URL, {
    params: {
      q: city,
      limit: 1,
      appid: API_KEY,
    },
  });

  if (!response.data.length) {
    throw new Error(`City not found: ${city}`);
  }

  const { lat, lon, name, country } = response.data[0];

  return { lat, lon, name: `${name}, ${country}` };
}

// ==============================
// FORECAST (free 5-day / 3-hour API)
// ==============================

export interface ForecastDay {
  weekday: string;
  temperature: number;
  icon: string;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    icon: string;
  }[];
}

interface OpenWeatherForecastResponse {
  city: {
    name: string;
    timezone: number; // shift in seconds from UTC
  };
  list: OpenWeatherForecastItem[];
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  // 1. Convert city name -> coordinates
  const { lat, lon } = await getCoordinates(city);

  // 2. Fetch forecast using those coordinates
  const response = await axios.get<OpenWeatherForecastResponse>(
    FORECAST_API_URL,
    {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    },
  );

  const { list, city: cityInfo } = response.data;

  const groups = new Map<string, OpenWeatherForecastItem[]>();

  for (const item of list) {
    const localDate = new Date((item.dt + cityInfo.timezone) * 1000);
    const key = localDate.toISOString().slice(0, 10);

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const result: ForecastDay[] = [];

  for (const [dateKey, items] of groups) {
    // Average temperature for the day
    const avgTemp =
      items.reduce((sum, i) => sum + i.main.temp, 0) / items.length;

    // Pick the icon closest to midday
    const midday =
      items.find((i) => {
        const hour = new Date((i.dt + cityInfo.timezone) * 1000).getUTCHours();
        return hour >= 12 && hour <= 15;
      }) ?? items[Math.floor(items.length / 2)];

    // Weekday name
    const localDate = new Date(`${dateKey}T12:00:00Z`);
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC",
    }).format(localDate);

    result.push({
      weekday,
      temperature: Math.round(avgTemp),
      icon: midday.weather[0].icon,
    });
  }

  const finalResult = result.slice(0, 7);

  return finalResult;
}
