import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import * as Pages from "./Pages";

import "./style.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Pages.SetupPage />} />
        <Route path="/waiting" element={<Pages.WaitingPage />} />
        <Route path="/question" element={<Pages.QuestionPage />} />
        <Route path="/loading" element={<Pages.LoadingPage />} />
        <Route path="/finalresult" element={<Pages.FinalResultPage />} />
        <Route path="/homepage" element={<Pages.LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
