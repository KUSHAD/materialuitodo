import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { firebaseAuth, firebaseFirestore } from '../../../../imports';
import { AppErrorBoundary } from '../../../Error';
class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: this.props.email,
			password: this.props.password,
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			userName: this.props.userName,
			zipCode: this.props.zipCode,
			country: this.props.country,
			phoneNumber: this.props.phoneNumber,
			imageURL: this.props.imageURL,
		};
	}
	onUpdateDetails = () => {
		firebaseAuth.currentUser
			.updateEmail(this.state.email)
			.then(() => {
				console.log('success');
				firebaseAuth.currentUser
					.updatePassword(this.state.password)
					.then(() => {
						console.log('success');
						firebaseAuth.currentUser
							.updatePhoneNumber(this.state.phoneNumber)
							.then(() => {
								console.log('success');
								firebaseAuth.currentUser
									.updateProfile({
										displayName: `${this.state.firstName} ${this.state.lastName}`,
										photoURL: this.state.imageURL,
									})
									.then(() => {
										console.log('Success');
										firebaseFirestore
											.collection('users')
											.doc(firebaseAuth.currentUser.uid)
											.set({
												email: this.state.email.trim(),
												password: this.state.password,
												userName: this.state.userName,
												firstName: this.state.firstName.trim(),
												lastName: this.state.lastName.trim(),
												fullName: `${this.state.firstName} ${this.state.lastName}`,
												downloadURL: this.state.imageURL,
												zipCode: this.state.zipCode,
												phoneNumber: this.state.phoneNumber,
												country: this.state.country,
											});
									})
									.catch((err) => console.log('error', err.message));
							})
							.catch((err) => console.log('error', err.message));
					})
					.catch((err) => console.log('error', err.message));
			})
			.catch((err) => console.log('error', err.message));
	};
	render() {
		return (
			<AppErrorBoundary>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<Grid
						style={{
							flexDirection: 'row',
						}}
					>
						<TextField
							label="First Name"
							value={this.state.firstName}
							variant="outlined"
							type="text"
							style={{
								margin: '15px',
							}}
							onChange={(e) => this.setState({ firstName: e.target.value })}
						/>
						<TextField
							label="Last Name"
							value={this.state.lastName}
							variant="outlined"
							type="text"
							style={{
								margin: '15px',
							}}
							onChange={(e) => this.setState({ lastName: e.target.value })}
						/>
					</Grid>
					<TextField
						label="Username"
						value={this.state.userName}
						variant="outlined"
						type="text"
						style={{
							margin: '15px',
						}}
						onChange={(e) =>
							this.setState({
								userName: e.target.value.trim().replace(' ', ' '),
							})
						}
					/>

					<Grid
						style={{
							flexDirection: 'row',
						}}
					>
						<TextField
							label="Country"
							value={this.state.country}
							variant="outlined"
							type="text"
							style={{
								margin: '15px',
							}}
							onChange={(e) => this.setState({ country: e.target.value })}
						/>
						<TextField
							label="Zip Code"
							value={this.state.zipCode}
							variant="outlined"
							type="text"
							style={{
								margin: '15px',
							}}
							onChange={(e) => this.setState({ zipCode: e.target.value })}
						/>
					</Grid>
					<TextField
						label="Phone Number"
						value={this.state.phoneNumber}
						variant="outlined"
						type="number"
						disabled
						style={{
							margin: '15px',
						}}
					/>
					<Grid
						style={{
							flexDirection: 'row',
						}}
					>
						<TextField
							label="Email"
							value={this.state.email}
							variant="outlined"
							type="email"
							onChange={(e) => this.setState({ email: e.target.value })}
							style={{
								margin: '15px',
							}}
						/>
						<TextField
							label="Password"
							value={this.state.password}
							variant="outlined"
							type="password"
							style={{
								margin: '15px',
							}}
							onChange={(e) => this.setState({ password: e.target.value })}
							onPasteCapture={(e) => e.preventDefault()}
						/>
					</Grid>
					<Button
						onClick={this.onUpdateDetails}
						color="primary"
						style={{
							margin: '15px',
						}}
						focusRipple
					>
						Update
					</Button>
				</Grid>
			</AppErrorBoundary>
		);
	}
}

export default Profile;
