import axios from "axios";

const OPEN_METEO_ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

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

interface HistoricalWeatherResponse {
  daily: {
    time: string[];
    temperature_2m_mean: number[];
  };
}

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

  if (!response.data.results?.length) {
    throw new Error(`City not found: ${city}`);
  }

  const { latitude, longitude, name, country } = response.data.results[0];

  return {
    lat: latitude,
    lon: longitude,
    name: `${name}, ${country}`,
  };
}

export async function getMonthlyAverage(
  city: string,
  language: "en" | "fa" = "en",
): Promise<ChartData[]> {
  // Get city coordinates
  const { lat, lon } = await getCityCoordinates(city);

  const today = new Date();

  // Last 12 complete months
  const endDate = new Date(today.getFullYear(), today.getMonth(), 0);

  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 11, 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const response = await axios.get<HistoricalWeatherResponse>(
    OPEN_METEO_ARCHIVE_URL,
    {
      params: {
        latitude: lat,
        longitude: lon,

        start_date: formatDate(startDate),
        end_date: formatDate(endDate),

        daily: "temperature_2m_mean",

        timezone: "auto",
      },
    },
  );

  const { time, temperature_2m_mean } = response.data.daily;

  // Group daily temperatures by month
  const monthlyData: Record<string, number[]> = {};

  time.forEach((date, index) => {
    const month = date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = [];
    }

    monthlyData[month].push(temperature_2m_mean[index]);
  });

  const locale = language === "fa" ? "fa-IR" : "en-US";

  return Object.entries(monthlyData).map(([month, temperatures]) => {
    const average =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

    const date = new Date(`${month}-01`);

    const label = new Intl.DateTimeFormat(locale, {
      month: "short",
    }).format(date);

    return {
      label,
      value: Math.round(average),
    };
  });
}
