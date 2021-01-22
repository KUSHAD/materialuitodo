import React from 'react';
import { render } from 'react-dom';
import App from './App/App';
const appElement = document.getElementById('app');

render(<App />, appElement, () => {
	// eslint-disable-next-line no-unused-expressions
	window.console &&
		(setTimeout(function () {
			return console.log(
				'%c%s',
				'color: red; background: yellow; font-size: 24px;',
				'WARNING!'
			);
		}),
		setTimeout(function () {
			return console.log(
				'%c%s',
				'font-size: 18px;',
				"Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.\nDo not enter or paste code that you don't understand."
			);
		}));
});
