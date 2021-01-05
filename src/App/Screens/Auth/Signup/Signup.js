import { Button, Grid, TextField } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth, firebaseFirestore } from '../../../../imports';

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
						})
						.then(() => {
							console.log('Success');
							this.setState({
								firstName: '',
								lastName: '',
								userName: '',
								email: '',
								password: '',
								confirmPassword: '',
							});
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
			<Grid
				style={{
					display: 'flex',
					height: '90vh',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<h1>Signup</h1>
				<LockOutlined />
				<Grid
					style={{
						flexDirection: 'row',
					}}
				>
					<TextField
						label="First Name"
						required
						variant="outlined"
						type="text"
						style={{
							margin: '15px',
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
							margin: '15px',
						}}
						value={this.state.lastName}
						onChange={(e) => this.setState({ lastName: e.target.value })}
					/>
				</Grid>
				<Grid
					style={{
						flexDirection: 'column',
					}}
				>
					<TextField
						label="User Name"
						required
						variant="outlined"
						type="text"
						style={{
							margin: '15px',
						}}
						value={this.state.userName}
						onChange={(e) =>
							this.setState({ userName: e.target.value.replace(' ', '_') })
						}
					/>
					<TextField
						label="Email"
						required
						variant="outlined"
						type="email"
						style={{
							margin: '15px',
						}}
						value={this.state.email}
						onChange={(e) => this.setState({ email: e.target.value })}
					/>
				</Grid>
				<Grid
					style={{
						flexDirection: 'row',
					}}
				>
					<TextField
						style={{
							margin: '15px',
						}}
						label="Password"
						required
						variant="outlined"
						type="password"
						value={this.state.password}
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
					<TextField
						style={{
							margin: '15px',
						}}
						label="Confirm Password"
						required
						variant="outlined"
						type="password"
						value={this.state.confirmPassword}
						onChange={(e) => this.setState({ confirmPassword: e.target.value })}
					/>
				</Grid>
				<Button
					style={{
						margin: '15px',
					}}
					focusRipple
					variant="contained"
					color="primary"
					onClick={this.onSignup}
				>
					Signup
				</Button>
				<Button component={Link} to="/login">
					Already Have An Account ? Login
				</Button>
			</Grid>
		);
	}
}

export default Signup;
