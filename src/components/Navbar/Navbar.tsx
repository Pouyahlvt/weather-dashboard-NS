"use client";

import { useTranslation } from "react-i18next";
import { Autocomplete, TextField } from "@mui/material";
import SettingButton from "./setting";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full h-20 flex items-center justify-between shadow-2xl bg-surface-50 dark:bg-[#151d32]">
      <div className="flex items-center ">
        <div className="h-12 aspect-square overflow-hidden rounded-full bg-primary-700 mx-6">
          <img
            src="/dashboard/weather-dashboard.png"
            alt="dashboard avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-semibold text-xl">{t("dashboard.title")}</h1>
      </div>
      <div className="flex">
        <Autocomplete
          disablePortal
          options={["tehran", "alborz", "New York"]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label={t("dashboard.search")} />
          )}
        />
        <SettingButton />
      </div>
    </section>
  );
};

export default Navbar;
