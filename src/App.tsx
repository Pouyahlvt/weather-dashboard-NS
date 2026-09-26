"use client";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login_page from "./pages/login";
import Dashboard from "./pages/dashboard";

const App = () => {
  const [name, setName] = useState("");
  return (
    <Routes>
      <Route path="/" element={<Login_page name={name} setName={setName} />} />

      <Route path="/dashboard" element={<Dashboard name={name} />} />
    </Routes>
  );
};

export default App;
