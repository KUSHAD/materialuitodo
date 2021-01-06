import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { firebaseAuth } from '../imports';
import { AppErrorBoundary } from './Error';
import { LoginScreen, SignupScreen } from './Screens/Auth';
import { MainScreen } from './Screens/Main';
import { store } from './Services/store';

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
				<AppErrorBoundary>
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
				</AppErrorBoundary>
			);
		}
		if (!this.state.loggedIn) {
			return (
				<AppErrorBoundary>
					<BrowserRouter>
						<Route path="/signup" exact component={SignupScreen} />
						<Route path="/login" exact component={LoginScreen} />
						<Route path="/" render={() => <Redirect to="/signup" />} />
						<Redirect to="signup" />
					</BrowserRouter>
				</AppErrorBoundary>
			);
		}
		return (
			<AppErrorBoundary>
				<Provider store={store}>
					<BrowserRouter>
						<Route path="/" component={MainScreen} />
					</BrowserRouter>
				</Provider>
			</AppErrorBoundary>
		);
	}
}

export default App;
