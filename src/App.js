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
		<>
			<div className="background-container" style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:'100vh',width:'100vw'  }} >
				<img src={ logo } alt="main logo"/>
				<Grid className="button-container" style={{ display:'flex', alignItems:'center', justifyContent:'center', margin:'auto' }}>
					<Button variant="contained" style={{fontWeight:'bold'}} sx={{ p: 3, m: 2.6 }}>Create Room</Button>
					<Button variant="contained" style={{fontWeight:'bold'}} sx={{ p: 3, m: 2.6 }}>Join Room</Button>
				</Grid>	
			</div>	
			
			{/* <Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Pages.SetupPage />} />
					<Route path="/waiting" element={<Pages.WaitingPage />} />
					<Route path="/question" element={<Pages.QuestionPage />} />
					<Route path="/loading" element={<Pages.LoadingPage />} />
					<Route path="/finalresult" element={<Pages.FinalResultPage />} />
				</Route>
			</Routes> */}

		</>
	);
};

export default App;
