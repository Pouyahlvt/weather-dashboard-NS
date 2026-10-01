"use client";

import { useEffect, useState } from "react";
import PulseLoader from "../ui/loading";
import AverageChart from "../cards/YearlyCharts";
import { getMonthlyAverage } from "../../service/chartAPI";
import { useApp } from "../../context/AppContext";

type ChartData = {
  label: string;
  value: number;
};

interface ChartSectionProps {
  city: string;
}

const ChartSection = ({ city }: ChartSectionProps) => {
  const { language } = useApp();

  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChart() {
      try {
        setLoading(true);

        const result = await getMonthlyAverage(city, language);

        setChartData(result.slice(0, 11));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadChart();
  }, [city, language]);

  return (
    <div
      className="
        relative
        w-55/100
        h-70
        rounded-4xl

        md:h-80

        max-sm:w-full
      ">
      <AverageChart data={chartData} />

      {loading && <PulseLoader />}
    </div>
  );
};

export default ChartSection;
