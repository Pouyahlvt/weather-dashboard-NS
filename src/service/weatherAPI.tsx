import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

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
