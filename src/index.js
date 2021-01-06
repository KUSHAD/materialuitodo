import React from 'react';
import { render } from 'react-dom';
import App from './App/App';
const appElement = document.getElementById('app');

render(<App />, appElement, () => {
	console.log('App is running fine !!');
});
