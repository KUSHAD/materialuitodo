import { blue, red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
const appElement = document.getElementById('app');

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[900]
		},
		secondary: {
			main: red[600]
		}
	}
});

render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	appElement,
	() => {
		console.log(
			'%c%s',
			'color: red; background: yellow; font-size: 24px;',
			'WARNING!'
		);
		console.log(
			'%c%s',
			'font-size: 18px;',
			"Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.\nDo not enter or paste code that you don't understand."
		);
	}
);

serviceWorker.register();
