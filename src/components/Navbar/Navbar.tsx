"use client";

import { useTranslation } from "react-i18next";
import { Autocomplete, TextField } from "@mui/material";
import SettingButton from "./setting";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <section
      className="w-full h-20 flex items-center justify-between shadow-xl/50 bg-dashbord-bg 
    dark:bg-dashbord-bg-dark transition-colors duration-300 dark:shadow-dashbord-bg/30">
      <div className="flex items-center ">
        <div className="h-12 aspect-square overflow-hidden rounded-full bg-primary-700 mx-6">
          <img
            src="/dashboard/weather-dashboard.png"
            alt="dashboard avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-semibold text-xl text-text dark:text-text-dark">
          {t("dashboard.title")}
        </h1>
      </div>
      <div className="flex text-text dark:text-text-dark">
        <Autocomplete
          disablePortal
          options={["tehran", "alborz", "New York"]}
          sx={{
            width: 300,

            // 👇 CHANGE THESE TWO LINES TO ANY COLOR YOU WANT
            color: "black", // light mode color
            "&.dark, .dark &": {
              color: "white", // dark mode color
            },

            // apply to all inner MUI parts
            "& .MuiInputBase-root": { color: "inherit" },
            "& .MuiInputBase-input": { color: "inherit" },
            "& .MuiInputLabel-root": { color: "inherit" },
            "& .MuiSvgIcon-root": { color: "inherit" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "currentColor",
            },
          }}
          slotProps={{
            paper: {
              sx: {
                // 👇 CHANGE THESE TOO — popup background + text
                bgcolor: "white",
                color: "black",
                ".dark &": {
                  bgcolor: "#1a1a1a",
                  color: "white",
                },
                "& .MuiAutocomplete-option": { color: "inherit" },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                  bgcolor: "#e1e9ee",
                  ".dark &": { bgcolor: "#292f45" },
                },
              },
            },
          }}
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
