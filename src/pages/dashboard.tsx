"use client";

import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/footer";

import WeatherSection from "../components/dashboard/WeatherSection";
import ChartSection from "../components/dashboard/ChartSection";
import ForecastSection from "../components/dashboard/ForecastSection";

interface DashboardProps {
  name: string;
}

const Dashboard = ({ name }: DashboardProps) => {
  const [city, setCity] = useState<string>("New york");

  console.log("welcome,", name);

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-dashbord-bg
        transition-colors
        duration-300
        dark:bg-dashbord-bg-dark
      ">
      <Navbar city={city} setCity={setCity} />

      <section
        className="
          mt-10
          flex
          w-full
          gap-7
          px-4

          max-sm:grid
          max-sm:grid-cols-1
          max-sm:gap-5
          max-sm:px-2
        ">
        <WeatherSection city={city} />

        <ChartSection city={city} />
      </section>

      <ForecastSection city={city} />

      <Footer />
    </main>
  );
};

export default Dashboard;
