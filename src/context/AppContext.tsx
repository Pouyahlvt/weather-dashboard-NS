import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "fa";
type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "fa" || savedLanguage === "en"
      ? savedLanguage
      : "en";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : "light";
  });

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  // Save language + update direction
  useEffect(() => {
    localStorage.setItem("language", language);

    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  // Save theme + update dark class
  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        setLanguage,
        toggleTheme,
        setTheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};
