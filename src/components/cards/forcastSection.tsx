import ForeCastCard from "./forecastCard";
import { useTranslation } from "react-i18next";

type ForecastDay = {
  weekday: string;
  temperature: number;
  icon: string;
};

interface ForcastProps {
  data: ForecastDay[];
}

const Fortecast = ({ data }: ForcastProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="
        w-full
        mt-10
        rounded-4xl
        bg-card-bg dark:bg-card-bg-dark
        shadow-[0_8px_25px_rgba(0,0,0,0.18)]

        max-sm:mt-6
        max-sm:rounded-3xl
        max-sm:shadow-none
        max-sm:bg-card-bg
        max-sm:px-2
      ">
      <h2
        className="
          mx-10
          pt-5
          text-2xl
          font-semibold
          text-text dark:text-text-dark

          max-md:mx-5
          max-md:text-lg

          max-sm:mx-3
          max-sm:pt-4
          max-sm:text-base
        ">
        Week forecast
      </h2>

      <div
        className="
          flex
          w-full
          justify-center
          gap-4
          px-6
          py-4
          overflow-x-auto
          overflow-y-hidden
          scrollbar-hide

          max-md:gap-3
          max-md:px-4

          max-sm:justify-start
          max-sm:gap-3
          max-sm:px-2
          max-sm:pb-5
          max-sm:scrollbar-none
        ">
        {data.map((day, i) => (
          <div
            key={`forecast-card-${i}`}
            className="
              shrink-0
              flex-1
              min-w-32

              md:h-100

              max-md:w-28
              max-sm:w-24
            ">
            <ForeCastCard
              day={
                i === 0
                  ? t("dashboard.week.today")
                  : t(`dashboard.week.${day.weekday.toLowerCase()}`)
              }
              icon={`https://openweathermap.org/payload/api/media/file/${day.icon}.png`}
              temp={day.temperature}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fortecast;
