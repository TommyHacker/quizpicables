import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { Routes, Route } from 'react-router-dom';
import pages from './pages';
import component from './components';

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
		</>
	);
};

export default App;
