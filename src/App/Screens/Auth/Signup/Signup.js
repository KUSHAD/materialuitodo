import { Button, Grid, TextField } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	firebaseAnalytics,
	firebaseAuth,
	firebaseFirestore
} from '../../../../imports';
import { AppErrorBoundary } from '../../../Error';
class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',
			country: '',
			zipCode: '',
			phoneNumber: ''
		};
		this.onSignup = this.onSignup.bind(this);
	}

	onSignup = (e) => {
		const { history } = this.props;
		e.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			firebaseAuth
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((result) => {
					console.log(`Success !!! ->`, result);
					const fullName = `${this.state.firstName} ${this.state.lastName}`;
					firebaseFirestore
						.collection('users')
						.doc(firebaseAuth.currentUser.uid)
						.set({
							email: this.state.email.trim(),
							password: this.state.password,
							userName: this.state.userName,
							firstName: this.state.firstName.trim(),
							lastName: this.state.lastName.trim(),
							fullName: fullName.trim(),
							downloadURL: `https://avatars.dicebear.com/api/identicon/${this.state.email}.svg`,
							zipCode: this.state.zipCode,
							phoneNumber: this.state.phoneNumber,
							country: this.state.country
						})
						.then(async () => {
							console.log('Success');
							await firebaseAnalytics.logEvent('sign_up', {
								name: fullName,
								email: this.state.email
							});
							this.setState({
								firstName: '',
								lastName: '',
								userName: '',
								email: '',
								password: '',
								confirmPassword: '',
								country: '',
								zipCode: '',
								phoneNumber: ''
							});
							await firebaseAuth.currentUser.sendEmailVerification();

							if (history) history.push('/');
						})
						.catch((err) => {
							console.log('Error !!! ->', err.message);
							alert(err.message);
						});
				})
				.catch((err) => {
					console.log('Error !!! ->', err.message);
					alert(err.message);
				});
		} else {
			alert('Passwords Should Match');
		}
	};
	render() {
		return (
			<AppErrorBoundary>
				<Grid
					style={{
						display: 'flex',
						flexGrow: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center'
					}}>
					<h1>Signup</h1>
					<LockOutlined />
					<Grid
						style={{
							flexDirection: 'row'
						}}>
						<TextField
							label="First Name"
							required
							variant="outlined"
							type="text"
							style={{
								margin: '15px'
							}}
							value={this.state.firstName}
							onChange={(e) => this.setState({ firstName: e.target.value })}
						/>
						<TextField
							label="Last Name"
							required
							variant="outlined"
							type="text"
							style={{
								margin: '15px'
							}}
							value={this.state.lastName}
							onChange={(e) => this.setState({ lastName: e.target.value })}
						/>
					</Grid>

					<TextField
						label="User Name"
						required
						variant="outlined"
						type="text"
						style={{
							margin: '15px'
						}}
						value={this.state.userName}
						onChange={(e) =>
							this.setState({ userName: e.target.value.replace(' ', '_') })
						}
					/>
					<Grid
						style={{
							flexDirection: 'row'
						}}>
						<TextField
							label="Country"
							required
							style={{
								margin: '15px'
							}}
							variant="outlined"
							type="text"
							onChange={(e) =>
								this.setState({ country: e.target.value.toUpperCase() })
							}
						/>
						<TextField
							label="Zip Code"
							required
							style={{
								margin: '15px'
							}}
							variant="outlined"
							type="text"
							onChange={(e) => this.setState({ zipCode: e.target.value })}
						/>
					</Grid>
					<TextField
						label="Phone Number"
						required
						style={{
							margin: '15px'
						}}
						variant="outlined"
						type="tel"
						onChange={(e) =>
							this.setState({
								phoneNumber: e.target.value.trim().replace(' ', '')
							})
						}
					/>
					<TextField
						label="Email"
						required
						variant="outlined"
						type="email"
						style={{
							margin: '15px'
						}}
						value={this.state.email}
						onChange={(e) => this.setState({ email: e.target.value })}
						helperText="A Verification Email Will Be Sent To You"
					/>
					<Grid
						style={{
							flexDirection: 'row'
						}}>
						<TextField
							style={{
								margin: '15px'
							}}
							label="Password"
							required
							variant="outlined"
							type="password"
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
							onPasteCapture={(e) => e.preventDefault()}
						/>
						<TextField
							style={{
								margin: '15px'
							}}
							label="Confirm Password"
							required
							variant="outlined"
							type="password"
							value={this.state.confirmPassword}
							onChange={(e) =>
								this.setState({ confirmPassword: e.target.value })
							}
							onPasteCapture={(e) => e.preventDefault()}
						/>
					</Grid>
					<Button
						style={{
							margin: '15px'
						}}
						focusRipple
						variant="contained"
						color="primary"
						onClick={this.onSignup}
						disabled={
							!this.state.firstName ||
							!this.state.lastName ||
							!this.state.userName ||
							!this.state.country ||
							!this.state.zipCode ||
							!this.state.phoneNumber ||
							!this.state.email ||
							!this.state.password ||
							!this.state.confirmPassword
						}>
						Signup
					</Button>
					<Button component={Link} to="/login">
						Already Have An Account ? Login
					</Button>
				</Grid>
			</AppErrorBoundary>
		);
	}
}

export default Signup;
