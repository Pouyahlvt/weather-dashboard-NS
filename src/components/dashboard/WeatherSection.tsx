"use client";

import { useEffect, useState } from "react";
import PulseLoader from "../ui/loading";
import CurrentWeatherCard, { type WeatherCardData } from "../cards/weatherCard";
import { getCurrentWeather } from "../../service/weatherAPI";
import { useApp } from "../../context/AppContext";

interface WeatherSectionProps {
  city: string;
}

const fakeData: WeatherCardData = {
  city: "City",
  date: "00/00/0000",
  time: "00:00",

  temperature: 11,
  high: 11,
  low: 11,
  feelsLike: 11,

  description: "description",

  icon: "",
};

const WeatherSection = ({ city }: WeatherSectionProps) => {
  const { language } = useApp();

  const [weather, setWeather] = useState<WeatherCardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCurrentWeather(city, language);

        const locale = language === "fa" ? "fa-IR" : "en-US";

        const now = new Date();

        const date = now.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        const time = now.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        const formattedWeather: WeatherCardData = {
          city: data.name,

          date,
          time,

          temperature: data.main.temp,

          high: data.main.temp_max,

          low: data.main.temp_min,

          feelsLike: data.main.feels_like,

          description: data.weather[0].description,

          icon: `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`,
        };

        setWeather(formattedWeather);
      } catch (error) {
        console.error(error);
        setError("Failed to get weather data.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, language]);

  return (
    <div
      className="
        relative
        w-45/100
        h-70
        rounded-4xl

        md:h-80

        max-sm:w-full
        max-sm:h-auto
      ">
      <CurrentWeatherCard data={weather ?? fakeData} />

      {loading && <PulseLoader />}

      {error && (
        <p className="absolute bottom-2 left-4 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default WeatherSection;
