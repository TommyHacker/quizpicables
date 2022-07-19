import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Layout from './Layout';

import { Routes, Route } from 'react-router-dom';
import * as Pages from "./Pages";
import * as components from './components';

import logo from './assets/images/logo_large.png';
import background from './assets/images/background8.jpg';
import './style.css';

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
