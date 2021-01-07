import { Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
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
		};
	}

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
						/>
						<TextField
							label="Last Name"
							value={this.state.lastName}
							variant="outlined"
							type="text"
							style={{
								margin: '15px',
							}}
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
						/>
					</Grid>
				</Grid>
			</AppErrorBoundary>
		);
	}
}

export default Profile;
