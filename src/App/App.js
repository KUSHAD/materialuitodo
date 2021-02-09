import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { firebaseAuth } from '../imports';
import { AppErrorBoundary } from './Error';
import { SideNavLayout } from './Layouts';
import {
	ForgotPasswordScreen,
	LoginScreen,
	SignupScreen,
	VerifyEmailScreen
} from './Screens/Auth';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false
		};
	}
	componentDidMount() {
		firebaseAuth.onAuthStateChanged(user => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true
				});
			} else {
				this.setState({
					loggedIn: true,
					loaded: true
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
							alignItems: 'center'
						}}>
						<CircularProgress size='20vh' color='primary' />
					</div>
				</AppErrorBoundary>
			);
		}
		if (!this.state.loggedIn) {
			return (
				<AppErrorBoundary>
					<BrowserRouter>
						<Route path='/signup' exact component={SignupScreen} />
						<Route path='/login' exact component={LoginScreen} />
						<Route
							path='/forgot-password'
							exact
							component={ForgotPasswordScreen}
						/>
						<Route path='/' render={() => <Redirect to='/login' />} />
						<Redirect to='/login' />
					</BrowserRouter>
				</AppErrorBoundary>
			);
		}
		if (firebaseAuth.currentUser.emailVerified) {
			return (
				<AppErrorBoundary>
					<SideNavLayout />
				</AppErrorBoundary>
			);
		} else {
			return (
				<AppErrorBoundary>
					<VerifyEmailScreen />
				</AppErrorBoundary>
			);
		}
	}
}

export default App;
