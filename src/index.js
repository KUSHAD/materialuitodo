import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App/App';
const appElement = document.getElementById('app');

render(
	<StrictMode>
		<App />
	</StrictMode>,
	appElement,
	() => {
		console.log('App is running fine !!');
	}
);
