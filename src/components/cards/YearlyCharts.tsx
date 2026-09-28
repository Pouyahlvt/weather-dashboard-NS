"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { useTranslation } from "react-i18next";

type ChartData = {
  label: string;
  value: number;
};

type MonthlyAverageChartProps = {
  data?: ChartData[];
};

const defaultData: ChartData[] = [
  { label: "اسفند", value: 15 },
  { label: "بهمن", value: 27 },
  { label: "دی", value: 21 },
  { label: "آذر", value: 22 },
  { label: "آبان", value: 28 },
  { label: "مهر", value: 23 },
  { label: "شهریور", value: 38 },
  { label: "مرداد", value: 30 },
  { label: "تیر", value: 33 },
  { label: "خرداد", value: 25 },
  { label: "اردیبهشت", value: 28 },
  { label: "فروردین", value: 32 },
];

export default function MonthlyAverageChart({
  data = defaultData,
}: MonthlyAverageChartProps) {
  const { t } = useTranslation();

  const labels = data.map((item) => item.label);
  const temperatures = data.map((item) => item.value);

  return (
    <div
      dir="rtl"
      className="
        w-full
        overflow-hidden
        h-70
        rounded-[28px]
        bg-card-bg dark:bg-card-bg-dark p-4 ms:p-6
        text-text dark:text-text-dark
      ">
      <h2 className="mb-2 text-right text-base font-medium text-text dark:text-text-dark sm:text-lg mx-5">
        {t("dashboard.avrage_title")}
      </h2>

      <div className="h-55 w-full -translate-x-5">
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: labels,
              tickLabelStyle: {
                fill: "currentcolor",
                fontSize: 10,
              },
              tickSize: 0,
            },
          ]}
          yAxis={[
            {
              min: -40,
              max: 40,
              tickNumber: 5,
              tickLabelStyle: {
                fill: "currentcolor",
                fontSize: 12,
              },
              tickSize: 0,
            },
          ]}
          series={[
            {
              data: temperatures,
              color: "currentcolor",
              showMark: false,
              curve: "linear",
            },
          ]}
          grid={{
            horizontal: true,
          }}
          sx={{
            width: "100%",
            height: "100%",

            "& .MuiChartsAxis-line": {
              stroke: "transparent",
            },

            "& .MuiChartsAxis-tick": {
              stroke: "transparent",
            },

            "& .MuiChartsGrid-line": {
              stroke: "currentcolor",
              strokeDasharray: "5 5",
            },

            "& .MuiLineElement-root": {
              strokeWidth: 2.5,
            },

            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              transform: "translateY(10px)",
            },
          }}
        />
      </div>
    </div>
  );
}
