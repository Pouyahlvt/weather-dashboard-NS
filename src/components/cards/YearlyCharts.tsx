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

export default function AverageChart({
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
        h-70
        overflow-hidden
        rounded-[28px]
        bg-card-bg
        p-4
        text-text
        dark:bg-card-bg-dark
        dark:text-text-dark

        sm:p-5
        md:h-80
        lg:p-6
      ">
      <h2
        className="
          mx-2
          mb-2
          text-right
          text-base
          font-medium
          text-text
          dark:text-text-dark

          sm:mx-3
          sm:text-lg

          lg:mx-5
        ">
        {t("dashboard.avrage_title")}
      </h2>

      <div
        className="
          h-55
          w-full

          sm:h-60

          lg:h-65
        ">
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
              min: -10,
              max: 40,

              // Fewer labels on small screens
              tickNumber: 5,

              tickLabelStyle: {
                fill: "currentcolor",
                fontSize: 11,
                translate: -18,
              },

              tickSize: 0,

              width: 22,
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
          margin={{
            left: 0,
            right: 8,
            top: 10,
            bottom: 25,
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
