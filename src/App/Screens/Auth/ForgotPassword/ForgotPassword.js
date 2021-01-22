import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../../../../imports';
function ForgotPassword() {
	const [email, setEmail] = useState('');
	const history = useHistory();
	const sendPasswordResetEmail = () => {
		firebaseAuth
			.sendPasswordResetEmail(email)
			.then(() => {
				console.log('successfully sent email');
				history.push('/login');
			})
			.catch((err) => {
				console.log('err', err.message);
				alert(err.message);
			});
	};
	return (
		<Grid
			style={{
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<TextField
				type="email"
				required
				variant="outlined"
				label="Email"
				style={{
					margin: 15,
				}}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button
				disabled={!email}
				onClick={sendPasswordResetEmail}
				variant="contained"
				color="primary"
			>
				Send Password Reset Email
			</Button>
		</Grid>
	);
}

export default ForgotPassword;
