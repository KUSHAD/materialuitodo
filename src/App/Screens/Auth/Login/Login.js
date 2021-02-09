import { Button, Checkbox, Grid, TextField } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAnalytics, firebaseAuth } from '../../../../imports';
import { AppErrorBoundary } from '../../../Error';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			passwordVisible: false
		};
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin = e => {
		const { history } = this.props;
		e.preventDefault();
		firebaseAuth
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(async result => {
				console.log('Success!!! ->', result);
				await firebaseAnalytics.logEvent('login', {
					email: this.state.email
				});
				this.setState({
					email: '',
					password: ''
				});
				if (history) history.push('/');
			})
			.catch(err => {
				console.log(err.message);
				alert(err.message);
			});
	};
	render() {
		return (
			<AppErrorBoundary>
				<Grid
					style={{
						display: 'flex',
						height: '90vh',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center'
					}}>
					<h1>Login</h1>
					<LockOutlined />
					<TextField
						label='Email'
						required
						variant='outlined'
						type='email'
						style={{
							margin: '15px'
						}}
						value={this.state.email}
						onChange={e => this.setState({ email: e.target.value })}
					/>
					<TextField
						style={{
							margin: '15px'
						}}
						label='Password'
						required
						variant='outlined'
						type={this.state.passwordVisible ? 'text' : 'password'}
						value={this.state.password}
						onChange={e => this.setState({ password: e.target.value })}
						onPasteCapture={e => e.preventDefault()}
					/>
					<Grid
						style={{
							flexDirection: 'row'
						}}>
						<Checkbox
							onChange={() => {
								if (this.state.passwordVisible) {
									this.setState({
										passwordVisible: false
									});
								} else {
									this.setState({
										passwordVisible: true
									});
								}
							}}
							color='primary'
						/>
						Show Password
					</Grid>
					<Button
						onClick={this.onLogin}
						style={{
							margin: '15px'
						}}
						focusRipple
						variant='contained'
						color='primary'
						disabled={!this.state.email || !this.state.password}>
						Login
					</Button>
					<Button component={Link} to='/signup'>
						Don't Have An Account ? Signup
					</Button>
					<Button component={Link} to='/forgot-password'>
						Forgot Password
					</Button>
				</Grid>
			</AppErrorBoundary>
		);
	}
}

export default Login;
