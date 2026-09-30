import { Mail, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

const getFormattedDate = (lang: string) => {
  const now = new Date();

  if (lang === "fa") {
    // Persian version
    const time = now.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const date = now.toLocaleDateString("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${time} . ${date}`;
  }

  // English version (default)
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${time} . ${date}`;
};

const Footer = () => {
  const { language } = useApp();
  const { t } = useTranslation();

  const [currentDate, setCurrentDate] = useState<string>("");

  // update every 1 minutes .
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(getFormattedDate(language));
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update when lang is changed
  useEffect(() => {
    const setTimeLang = () => {
      setCurrentDate(getFormattedDate(language));
    };
    setTimeLang();
  }, [language]);
  return (
    <footer className="w-full bg-card-bg dark:bg-card-bg py-4 px-6 md:px-10 text-[#1e4e75]">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
        {/* Left Section: Logo & Copyright */}
        <div className="flex items-center gap-4">
          {/* Logo Placeholder */}
          <img
            src="/dashboard/footer-icon.png"
            alt="nadin soft icon"
            className="w-12 max-sm:w-6"
          />

          <p className="text-center max-sm:text-[8px]">
            {t("dashboard.footer_text")}
          </p>
        </div>

        {/* Right Section: Contact & Date */}
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 max-sm:gap-2">
          {/* Contact Info */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 max-sm:w-3" strokeWidth={1.5} />
            <span className="max-sm:text-[8px]">
              {t("dashboard.footer_contact")} :{" "}
              <a href="" className="hover:underline">
                info@nadin.ir
              </a>
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 ">
            <Calendar
              className="w-5 h-5 max-sm:w-3 max-sm:h-3 "
              strokeWidth={1.5}
            />
            <span className="max-sm:text-[8px]">{currentDate}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
