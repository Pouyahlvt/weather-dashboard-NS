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
      className="w-full  bg-card-bg dark:bg-card-bg-dark mt-10  rounded-4xl relative 
        shadow-[0_8px_25px_rgba(0,0,0,0.18)] ">
      <h2 className="mx-10 text-2xl text-text dark:text-text-dark pt-5 font-semibold">
        Week forecast
      </h2>
      <div className="flex justify-center h-100 overflow-hidden overflow-x-auto">
        {data.map((day, i) => (
          <div
            key={`forcast-card-${i}`}
            className="w-full my-2 mx-5 max-lg:mx-2 max-md:mx-2 min-w-30 ">
            <ForeCastCard
              day={
                i === 0
                  ? t(`dashboard.week.today`)
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
