import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { firebaseAuth } from '../imports';
import { LoginScreen, SignupScreen } from './Screens/Auth';
import { MainScreen, ProfileScreen } from './Screens/Main';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
		};
	}
	componentDidMount() {
		firebaseAuth.onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true,
				});
			} else {
				this.setState({
					loggedIn: true,
					loaded: true,
				});
			}
		});
	}
	render() {
		if (!this.state.loaded) {
			return (
				<div
					style={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress size="20vh" color="primary" />
				</div>
			);
		}
		if (!this.state.loggedIn) {
			return (
				<BrowserRouter>
					<Route path="/signup" exact component={SignupScreen} />
					<Route path="/login" exact component={LoginScreen} />
					<Route path="/" render={() => <Redirect to="/signup" />} />
					<Redirect to="signup" />
				</BrowserRouter>
			);
		}
		return (
			<BrowserRouter>
				<Route path="/" exact component={MainScreen} />
				<Route path="/profile" exact component={ProfileScreen} />
				<Redirect to="/" />
			</BrowserRouter>
		);
	}
}

export default App;
