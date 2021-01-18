import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import UpdateIcon from '@material-ui/icons/Update';
import React, { Component } from 'react';
import {
	firebaseAuth,
	firebaseFirestore,
	firebaseStorage,
} from '../../../../imports';
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
			imgUpload: '',
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
						firebaseFirestore
							.collection('users')
							.doc(firebaseAuth.currentUser.uid)
							.update({
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
					.catch((err) => alert('error', err.message));
			})
			.catch((err) => alert('error', err.message));
	};
	onUploadPhoto = () => {
		console.log(this.state.imgUpload);
		firebaseStorage
			.ref(`/${firebaseAuth.currentUser.uid}/${this.state.imgUpload.name}`)
			.put(this.state.imgUpload)
			.on(
				'state_changed',
				(snapshot) => {
					console.log(snapshot);
				},
				(err) => {
					alert(err.message);
					console.log(err);
				},
				() => {
					firebaseStorage
						.ref(firebaseAuth.currentUser.uid)
						.child(this.state.imgUpload.name)
						.getDownloadURL()
						.then((url) => {
							firebaseFirestore
								.collection('users')
								.doc(firebaseAuth.currentUser.uid)
								.update({
									downloadURL: url,
								})
								.then(() => {
									console.log('sucess');
									window.location.reload();
								})
								.catch((err) => {
									alert(err.message);
									console.log('err -->', err.message);
								});
						});
				}
			);
	};
	deleteAccount = () => {
		firebaseFirestore
			.collection('users')
			.doc(firebaseAuth.currentUser.uid)
			.delete()
			.then(() => {
				console.log('deleted Succesfully');
				firebaseStorage
					.ref(`${firebaseAuth.currentUser.uid}`)
					.delete()
					.then(() => {
						firebaseAuth.currentUser
							.delete()
							.then((res) => {
								console.log('deleted Succesfully');
								window.location.reload();
							})
							.catch((err) => {
								console.log('err deleting account -->', err.message);
							});
					})
					.catch(() => {
						console.log('err deleting account');
					});
			})

			.catch((err) => {
				console.log('err deleting account -->', err.message);
			});
	};
	render() {
		return (
			<AppErrorBoundary>
				<Paper
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: 25,
					}}
				>
					<Typography variant="h3" align="center">
						Update Your Look
					</Typography>
					<AppErrorBoundary>
						<center>
							<div
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									margin: 15,
								}}
							>
								<input
									style={{
										display: 'none',
									}}
									onChange={(e) => {
										const image = e.target.files[0];
										this.setState({
											imgUpload: image,
										});
									}}
									accept=".jpg,.jpeg,.png,.bimp,.gif"
									type="file"
									ref={(fileInput) => (this.fileInput = fileInput)}
								/>
								<Button
									onClick={() => this.fileInput.click()}
									variant="contained"
									color="primary"
								>
									<InsertDriveFileIcon />
									Choose File
								</Button>
								<Button
									disabled={!this.state.imgUpload}
									onClick={this.onUploadPhoto}
									focusRipple
									color="primary"
									variant="contained"
								>
									<CloudUploadIcon />
									Upload File
								</Button>
							</div>
						</center>
					</AppErrorBoundary>
				</Paper>
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
						type="tel"
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
						style={{
							backgroundColor: '#ff0000',
							color: '#fff',
						}}
						variant="contained"
						onClick={this.deleteAccount}
					>
						<DeleteForeverIcon />
						Delete Account
					</Button>
					<Button
						onClick={this.onUpdateDetails}
						color="primary"
						style={{
							margin: '15px',
						}}
						focusRipple
						variant="contained"
						disabled={
							this.state.firstName === this.props.firstName &&
							this.state.lastName === this.props.lastName &&
							this.state.country === this.props.country &&
							this.state.userName === this.props.userName &&
							this.state.email === this.props.email &&
							this.state.password === this.props.password &&
							this.state.zipCode === this.props.zipCode &&
							this.state.phoneNumber === this.props.phoneNumber
						}
					>
						<UpdateIcon />
						Update
					</Button>
				</Grid>
			</AppErrorBoundary>
		);
	}
}

export default Profile;
