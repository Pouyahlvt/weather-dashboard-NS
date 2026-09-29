import Navbar from "../components/Navbar/Navbar";
import AverageChart from "../components/cards/YearlyCharts";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import PulseLoader from "../components/ui/loading";
import { getForecast, type ForecastDay } from "../service/weatherAPI";
import { Alert } from "@mui/material";
import Fortecast from "../components/cards/forcastSection";
import { getChartData } from "../service/chartAPI";

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
  console.log("wellcome , ", name);
  const { t } = useTranslation();
  const [city, setCity] = useState<string>("new york");

  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [weather, setWeather] = useState<WeatherCardData | null>(null);

  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const language = t("commen.lng") as "en" | "fa";

  useEffect(() => {
    async function fetchChart() {
      try {
        const data = await getChartData(city, 14, language);
        setChartData(data);
      } catch (err) {
        console.error("Chart fetch failed:", err);
      }
    }
    fetchChart();
  }, [language, city]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);

        const data = await getForecast(city);

        setForecast(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load weather forecast.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCurrentWeather(city, language);

        const now = new Date();

        const date = now.toLocaleDateString(
          language === "fa" ? "fa-IR" : "en-US",
          {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        );

        const time = now.toLocaleTimeString(
          language === "fa" ? "fa-IR" : "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          },
        );

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
        setError(`Failed to get weather data :( `);
        console.error(` error : ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [language, city]);

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

  const fakeData: WeatherCardData = {
    city: "City",
    date: "00/00/0000",
    time: "00:00",

    temperature: 11,
    high: 11,
    low: 11,
    feelsLike: 11,

    description: "describtion",

    icon: "",
  };

  return (
    <main className="w-full min-h-screen bg-dashbord-bg dark:bg-dashbord-bg-dark transition-colors duration-300">
      {error && <Alert severity="error">{error}</Alert>}
      <Navbar city={city} setCity={setCity} />
      <section className="w-full flex gap-7 px-4 mt-10">
        <div className="w-45/100 h-70  rounded-4xl relative">
          <CurrentWeatherCard data={weather !== null ? weather : fakeData} />
          {loading && <PulseLoader />}
        </div>
        <div className="w-55/100 h-70  rounded-4xl relative">
          <AverageChart data={chartData ? chartData : defaultData} />
          {loading && <PulseLoader />}
        </div>
      </section>
      <div className="px-5 pb-30 w-full mt-10 relative">
        <Fortecast data={forecast} />
        {loading && <PulseLoader />}
      </div>
    </main>
  );
};

export default Dashboard;
