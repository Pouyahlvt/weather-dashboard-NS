import Navbar from "../components/Navbar/Navbar";
import TemperatureChart from "../components/cards/YearlyCharts";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import CurrentWeatherCard, {
  type WeatherCardData,
} from "../components/cards/weatherCard";

import { getCurrentWeather } from "../service/weatherAPI";
interface Dashboard_props {
  name: string;
}

type ChartData = {
  label: string;
  value: number;
};

const Dashboard = ({ name }: Dashboard_props) => {
  console.log(`Welcome ${name}`);
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherCardData | null>({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const language = t("commen.lng") as "en" | "fa";

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCurrentWeather("San Francisco", language);

        const formattedWeather: WeatherCardData = {
          city: data.name,

          date: "Monday",
          time: "11:45 AM",

          temperature: data.main.temp,

          high: data.main.temp_max,

          low: data.main.temp_min,

          feelsLike: data.main.feels_like,

          description: data.weather[0].description,

          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };

        setWeather(formattedWeather);
      } catch (error) {
        setError(`Failed to get weather data. error : ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [language]);

  const defaultData: ChartData[] = [
    { label: t("dashboard.months.1"), value: 15 },
    { label: t("dashboard.months.1"), value: 27 },
    { label: t("dashboard.months.2"), value: 21 },
    { label: t("dashboard.months.3"), value: 22 },
    { label: t("dashboard.months.4"), value: 28 },
    { label: t("dashboard.months.5"), value: 23 },
    { label: t("dashboard.months.6"), value: 38 },
    { label: t("dashboard.months.7"), value: 30 },
    { label: t("dashboard.months.8"), value: 33 },
    { label: t("dashboard.months.9"), value: 25 },
    { label: t("dashboard.months.10"), value: 28 },
    { label: t("dashboard.months.11"), value: 32 },
  ];

  const fakeOpenWeatherResponse: WeatherCardData = {
    city: "San Francisco",

    main: {
      temp: 18.7,
      feels_like: 17.9,
      temp_min: 16.2,
      temp_max: 20.5,
      pressure: 1013,
      humidity: 72,
    },

    weather: [
      {
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    ],

    wind: {
      speed: 4.6,
    },
  };

  return (
    <main className="w-full min-h-screen bg-dashbord-bg dark:bg-dashbord-bg-dark transition-colors duration-300">
      <Navbar />
      <section className="w-full flex gap-7 px-4 mt-20">
        <div className="w-39/100 h-50">
          <CurrentWeatherCard data={fakeOpenWeatherResponse} />
        </div>
        <div className="w-59/100 h-50 ">
          <TemperatureChart data={defaultData} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
