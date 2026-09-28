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

type WeatherCardProps = {
  data: WeatherCardData;
};

export default function CurrentWeatherCard({ data }: WeatherCardProps) {
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
      <div
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          
          px-4
          py-2
          text-sm
          dark:bg-card-bg/20 bg-card-bg-dark/20 text-text dark:text-text-dark
          
        `}>
        <MapPin size={18} />

        <span className="text-xl font-semibold">{data.city}</span>
      </div>

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-6

          sm:grid-cols-2
          sm:items-center
        ">
        <div>
          <h2
            className="
              text-xl
              font-medium
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
            scale-150
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
