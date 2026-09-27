"use client";

import {
  Button,
  TextField,
  InputLabel,
  Select,
  type SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import type { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

interface Login_props {
  name: string;
  setName: React.Dispatch<SetStateAction<string>>;
}

const Login_page = ({ name, setName }: Login_props) => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useApp();
  const navigate = useNavigate();

  const change_language = (event: SelectChangeEvent) => {
    const new_language = event.target.value as "en" | "fa";
    setLanguage(new_language);
    i18n.changeLanguage(new_language);
  };

  const handle_click = () => {
    if (name.length < 2) {
      alert("Your name is too short at leats be 2 charecter");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <main className="w-full min-h-screen bg-surface-200 flex justify-center pt-40 pb-60 relative max-sm:p-0">
      <section className="w-full h-140 mx-60 max-lg:mx-30 max-md:mx-5 max-sm:mx-0 rounded-2xl max-sm:rounded-none max-sm:h-screen flex shrink overflow-hidden shadow-xl ">
        <div className="w-[50%] h-full bg-surface-50 flex justify-center items-center max-sm:w-full max-sm:items-start max-sm:pt-10">
          <div className="w-8/10 h-7/10 relative ">
            <h1 className="text-center text-3xl font-bold mb-8">
              {t("login.login")}
            </h1>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              label={t("login.placeholder")}
              className=" w-full"></TextField>
            <div className="w-full bottom-0 absolute max-sm:static max-sm:mt-5">
              <Button
                onClick={handle_click}
                variant="contained"
                color={"primary"}
                size="large"
                className="w-full">
                {t("login.login")}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-[#D3E1E7] relative max-sm:hidden">
          <img
            src="/login-images/light-form.png"
            alt="light form"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <div className="w-full flex justify-center absolute bottom-30">
        <div>
          <InputLabel variant="standard" htmlFor={"select-lang"}>
            {t("common.languages")}
          </InputLabel>
          <Select
            variant={"standard"}
            defaultValue={"English"}
            onChange={change_language}
            value={language}
            className="w-50"
            inputProps={{
              name: "Language",
              id: "select-lang",
            }}>
            <MenuItem value="en">{t("common.english")}</MenuItem>
            <MenuItem value="fa">{t("common.persian")}</MenuItem>
          </Select>
        </div>
      </div>
    </main>
  );
};

export default Login_page;
