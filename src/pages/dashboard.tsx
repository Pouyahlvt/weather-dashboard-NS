import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";

interface Dashboard_props {
  name: string;
}

const Dashboard = ({ name }: Dashboard_props) => {
  const { t } = useTranslation();

  return (
    <main className="w-full min-h-screen bg-amber-200">
      <h1 className="text-5xl m-10 text-center">{name}</h1>
      <h1 className="text-5xl m-10 text-center">{t("dashboard.title")}</h1>
    </main>
  );
};

export default Dashboard;
