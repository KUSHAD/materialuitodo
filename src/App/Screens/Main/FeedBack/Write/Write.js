import {
	Button,
	Grid,
	InputLabel,
	MenuItem,
	Modal,
	Paper,
	Select,
	TextField,
	Typography
} from '@material-ui/core';
import { Close, Create } from '@material-ui/icons';
import React, { useState } from 'react';
import {
	firebaseAnalytics,
	firebaseAuth,
	firebaseRealTimeDatabase,
	firebaseRealTimeDatabaseTimestamp
} from '../../../../../imports';
import { AppErrorBoundary } from '../../../../Error';
const Write = props => {
	const [feedback, setFeedback] = useState('');
	const [feedbackType, setFeedbackType] = useState('');

	const submitFeedback = () => {
		const fullName = `${props.firstName} ${props.lastName}`;
		const userName = `@${props.userName}`;
		firebaseRealTimeDatabase
			.ref(`${feedbackType}/${firebaseAuth.currentUser.uid}/${Date.now()}`)
			.set(
				{
					email: props.email,
					imageURL: props.imageURL,
					name: fullName,
					userName: userName,
					feedback: feedback,
					createdAt: firebaseRealTimeDatabaseTimestamp
				},
				e => {
					if (e) {
						console.log(e.message, e.name, e.stack);
						alert(`Error -->${e.message}`);
					} else {
						firebaseAnalytics.logEvent('feedback_received', {
							email: props.email,
							name: fullName,
							feedback: feedback,
							createdAt: firebaseRealTimeDatabaseTimestamp
						});
						window.open(`/feedback`, '_self');
					}
				}
			);
	};
	return (
		<Modal open>
			<Paper>
				<Grid
					style={{
						display: 'flex',
						justifyContent: 'center',
						margin: 15,
						flexDirection: 'column'
					}}>
					<Typography variant='h3'>Write Your Feedback</Typography>
					<AppErrorBoundary>
						<Grid
							style={{
								flexDirection: 'row'
							}}>
							<InputLabel>Choose Type Of Feedback</InputLabel>
							<Select
								value={feedbackType}
								onChange={e => setFeedbackType(e.target.value)}
								fullWidth
								placeholder='Type Of Feedback'
								variant='outlined'>
								<MenuItem value=''>
									<em>---Choose---</em>
								</MenuItem>
								<MenuItem value='comment'>Comment</MenuItem>
								<MenuItem value='bugReport'>Bug Report</MenuItem>
								<MenuItem value='featureRequest'>Feature Request</MenuItem>
							</Select>
							<Grid
								style={{
									flexDirection: 'row',
									marginTop: 15
								}}>
								<TextField
									label='Write Your Feedback'
									value={feedback}
									onChange={e => setFeedback(e.target.value)}
									placeholder='Write Your Feedback'
									variant='outlined'
									fullWidth
									multiline
									rows={5}
									rowsMax={15}
								/>
							</Grid>
						</Grid>
						<Grid
							style={{
								flexDirection: 'row'
							}}>
							<center>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => window.open('/feedback', '_self')}>
									<Close /> Close
								</Button>
								<Button
									onClick={submitFeedback}
									disabled={!feedback || !feedbackType}
									variant='contained'
									color='primary'>
									<Create />
									Add
								</Button>
							</center>
						</Grid>
					</AppErrorBoundary>
				</Grid>
			</Paper>
		</Modal>
	);
};

export default Write;
