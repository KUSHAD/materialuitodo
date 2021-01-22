import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { firebaseAuth } from '../../../../imports';
function Verify() {
	useEffect(() => {
		document.title = `MATERIALUITODO - Verify Email`;
	});
	const resendVerificationEmail = async () => {
		await firebaseAuth.currentUser
			.sendEmailVerification()
			.then(() => {
				console.log('successfully sent email');
			})
			.catch((err) => {
				console.log('err ->', err);
			});
	};
	return (
		<Grid
			style={{
				display: 'flex',
				height: '90vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Grid
				style={{
					width: '80%',
				}}
			>
				<Grid
					style={{
						width: '100%',
						textAlign: 'center',
					}}
				>
					<Paper
						style={{
							margin: 25,
						}}
					>
						<Typography variant="h5">Verify Your Email</Typography>
						<Typography variant="body2">
							Go to your email inbox, and please verify your email.
						</Typography>
						<Typography variant="body2">Then refresh this page</Typography>
						<center>
							<Button
								onClick={resendVerificationEmail}
								color="primary"
								variant="contained"
							>
								Re-send Verification Email
							</Button>
						</center>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Verify;
