import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux-toolkit/store/store';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import './style.css';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const theme = createTheme({
	typography: {
		fontFamily: [
		  'Dosis',
		  'BlinkMacSystemFont',
		  '"Segoe UI"',
		  'Roboto',
		].join(','),
	  },
	palette: {
		primary:{
			light: "#665A9F",
			main: "#8D5FB3"
		},
		secondary:{
			main: "#CCC",
			
		}
	}
})

root.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>	
	</ThemeProvider>
);
