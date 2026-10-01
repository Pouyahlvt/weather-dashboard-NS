"use client";

import { useTranslation } from "react-i18next";
import { Autocomplete, TextField } from "@mui/material";
import SettingButton from "./setting";
import type { SetStateAction } from "react";

interface NavProps {
  city: string;
  setCity: React.Dispatch<SetStateAction<string>>;
}

const Navbar = ({ city, setCity }: NavProps) => {
  const { t } = useTranslation();

  const cities = [
    // Middle East
    "tehran",
    "yazd",
    "alborz",
    "chalus",
    "kashan",
    "mashhad",
    "rasht",
    "isfahan",
    "shiraz",
    "tabriz",
    "dubai",
    "abu dhabi",
    "doha",
    "riyadh",
    "jeddah",
    "istanbul",
    "ankara",
    "jerusalem",
    "tel aviv",
    "beirut",
    "amman",
    "baghdad",

    // Europe
    "london",
    "paris",
    "berlin",
    "amsterdam",
    "rome",
    "moscow",
    "madrid",
    "barcelona",
    "lisbon",
    "vienna",
    "prague",
    "budapest",
    "warsaw",
    "athens",
    "dublin",
    "copenhagen",
    "stockholm",
    "oslo",
    "helsinki",
    "zurich",
    "geneva",
    "brussels",
    "milan",
    "venice",
    "munich",
    "frankfurt",
    "edinburgh",
    "manchester",
    "st petersburg",
    "kyiv",

    // North America
    "new york",
    "los angeles",
    "miami",
    "toronto",
    "vancouver",
    "chicago",
    "san francisco",
    "seattle",
    "boston",
    "washington dc",
    "las vegas",
    "houston",
    "dallas",
    "atlanta",
    "denver",
    "montreal",
    "ottawa",
    "mexico city",
    "cancun",

    // South America
    "sao paulo",
    "rio de janeiro",
    "buenos aires",
    "lima",
    "bogota",
    "santiago",
    "caracas",

    // Asia
    "tokyo",
    "osaka",
    "kyoto",
    "seoul",
    "busan",
    "beijing",
    "shanghai",
    "hong kong",
    "singapore",
    "bangkok",
    "kuala lumpur",
    "jakarta",
    "manila",
    "hanoi",
    "ho chi minh",
    "mumbai",
    "delhi",
    "bangalore",
    "kolkata",
    "karachi",
    "lahore",
    "dhaka",
    "kathmandu",
    "colombo",

    // Africa
    "cairo",
    "alexandria",
    "casablanca",
    "marrakech",
    "nairobi",
    "lagos",
    "cape town",
    "johannesburg",
    "addis ababa",
    "tunis",
    "accra",

    // Oceania
    "sydney",
    "melbourne",
    "brisbane",
    "perth",
    "auckland",
    "wellington",
  ];

  return (
    <section
      className="w-full h-20 flex items-center justify-between shadow-xl/50 bg-dashbord-bg max-sm:h-15
    dark:bg-dashbord-bg-dark transition-colors duration-300 dark:shadow-dashbord-bg/30">
      <div className="flex items-center ">
        <div className="h-12 aspect-square overflow-hidden rounded-full bg-primary-700 mx-6 max-sm:h-8 max-sm:mx-2">
          <img
            src="/dashboard/weather-dashboard.png"
            alt="dashboard avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-semibold text-xl text-text dark:text-text-dark max-sm:hidden">
          {t("dashboard.title")}
        </h1>
      </div>
      <div className="flex text-text dark:text-text-dark items-center">
        <Autocomplete
          value={city}
          onChange={(_e, newValue) => setCity(newValue ? newValue : city)}
          disablePortal
          options={cities}
          getOptionLabel={(option) =>
            t(`dashboard.city.${option.toLowerCase()}`)
          }
          className="w-75 max-md:w-55 max-sm:max-w-45"
          sx={{
            color: "black",

            "&.dark, .dark &": {
              color: "white",
            },

            "& .MuiInputBase-root": {
              color: "inherit",

              "@media (max-width:600px)": {
                height: "38px",
                fontSize: "13px",
              },
            },

            "& .MuiInputBase-input": {
              color: "inherit",

              "@media (max-width:600px)": {
                fontSize: "13px",
                padding: "6px 8px !important",
              },
            },

            "& .MuiInputLabel-root": {
              color: "inherit",

              "@media (max-width:600px)": {
                fontSize: "13px",
                transform: "translate(14px, 10px) scale(1)",
              },
            },

            "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
              {
                "@media (max-width:600px)": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              },

            "& .MuiSvgIcon-root": {
              color: "inherit",

              "@media (max-width:600px)": {
                fontSize: "18px",
              },
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "currentColor",
            },
          }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "white",
                color: "black",

                ".dark &": {
                  bgcolor: "#1a1a1a",
                  color: "white",
                },

                "& .MuiAutocomplete-option": {
                  color: "inherit",

                  // Smaller options on mobile
                  "@media (max-width:600px)": {
                    minHeight: "32px",
                    fontSize: "12px",
                    padding: "5px 10px",
                  },
                },

                '& .MuiAutocomplete-option[aria-selected="true"]': {
                  bgcolor: "#e1e9ee",

                  ".dark &": {
                    bgcolor: "#292f45",
                  },
                },
              },
            },
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("dashboard.search")} />
          )}
        />
        <div className="mx-5 max-sm:mx-2">
          <SettingButton />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
