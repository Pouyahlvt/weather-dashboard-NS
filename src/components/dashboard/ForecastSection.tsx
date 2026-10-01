"use client";

import { useEffect, useState } from "react";
import PulseLoader from "../ui/loading";
import Fortecast from "../cards/forcastSection";
import { getForecast, type ForecastDay } from "../../service/weatherAPI";

interface ForecastSectionProps {
  city: string;
}

const ForecastSection = ({ city }: ForecastSectionProps) => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchForecast() {
      try {
        setLoading(true);
        setError(null);

        const data = await getForecast(city);

        setForecast(data);
      } catch (error) {
        console.error(error);

        setError("Failed to load weather forecast.");
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [city]);

  return (
    <div
      className="
        relative
        w-full
        px-5
        pb-30
        mt-10

        max-sm:px-2
      ">
      <Fortecast data={forecast} />

      {loading && <PulseLoader />}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ForecastSection;
