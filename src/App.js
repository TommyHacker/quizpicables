import React from 'react';
import { Routes, Route } from 'react-router-dom';
import pages from './pages';
import component from './components';
import assets from './assets';
import {QuizQuestions} from './components';
import {LandingPage} from './pages';


import './style.css';

const App = () => {
	return (
		<>
			<h1>boilerplate application</h1>
			<LandingPage />
		</>
	);
};

export default App;
