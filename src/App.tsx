import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Login_page = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App = () => {
  const [name, setName] = useState("");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={<Login_page name={name} setName={setName} />}
        />

        <Route path="/dashboard" element={<Dashboard name={name} />} />
      </Routes>
    </Suspense>
  );
};

export default App;
