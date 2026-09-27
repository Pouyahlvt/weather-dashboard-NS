"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export type WeatherCardData = {
  city: string;
  date: string;
  time: string;

  temperature: number;
  high: number;
  low: number;
  feelsLike: number;

  description: string;

  icon: string;
};

type CurrentWeatherCardProps = {
  data: WeatherCardData;
};

export default function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const { t } = useTranslation();

  return (
    <section
      className={`
        relative
        w-full
        overflow-hidden
        rounded-[28px]
        p-5
        h-70
        shadow-[0_8px_25px_rgba(0,0,0,0.18)]
        transition-colors
        duration-300
        sm:p-6
        md:p-7

       bg-card-bg dark:bg-card-bg-dark text-text dark:text-text-dark

      `}>
      {/* Top location */}
      <div
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          
          px-4
          py-2
          text-sm
          bg-card-bg dark:bg-card-bg-dark text-text dark:text-text-dark
          
        `}>
        <MapPin size={18} />

        <span>{data.city}</span>
      </div>

      {/* Main content */}
      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-6

          sm:grid-cols-2
          sm:items-center
        ">
        {/* Left information */}
        <div>
          <h2
            className="
              text-3xl
              font-medium
              sm:text-4xl
              md:text-5xl
            ">
            {data.date}
          </h2>

          <p
            className={`
              mt-1
              text-sm
              text-text dark:text-text-dark
            `}>
            {data.time}
          </p>

          {/* Temperature */}
          <div className="mt-4">
            <span
              className="
                text-5xl
                font-medium
                tracking-tight
                sm:text-6xl
              ">
              {Math.round(data.temperature)}
            </span>

            <span
              className="
                ml-1
                align-top
                text-3xl
                sm:text-4xl
              ">
              °C
            </span>
          </div>

          {/* High / Low */}
          <div
            className={`
              mt-1
              flex
              gap-3
              text-sm
              text-text dark:text-text-dark
            `}>
            <span>
              {t("dashboard.weather_card.high")}: {Math.round(data.high)}
            </span>

            <span>
              {t("dashboard.weather_card.low")}: {Math.round(data.low)}
            </span>
          </div>
        </div>

        {/* Right weather information */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            sm:items-end
          ">
          <img
            src={data.icon}
            alt={data.description}
            className="
              object-contain
            "
          />

          <p
            className="
              mt-1
              text-2xl
              font-medium
              sm:text-3xl
            ">
            {data.description}
          </p>

          <p
            className={`
              mt-1
              text-sm
              text-text dark:text-text-dark
            `}>
            {t("dashboard.weather_card.feelsLike")} {Math.round(data.feelsLike)}
            °C
          </p>
        </div>
      </div>
    </section>
  );
}
