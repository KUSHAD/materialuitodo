import {
	Avatar,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Paper,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';
import { firebaseRealTimeDatabase } from '../../../../../imports';
import { AppErrorBoundary } from '../../../../Error';
class BugReports extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userComments: []
		};
	}
	componentDidMount() {
		this.fetchComments();
	}
	fetchComments = () => {
		let comments = [];
		let filteredComments = [];
		firebaseRealTimeDatabase.ref('bugReport/').on('value', (data) => {
			data.forEach((data) => {
				comments.push(data.val());
				for (let userUid in comments) {
					Object.entries(comments[userUid]).map((e) => {
						filteredComments.push(e[1]);
						console.log(filteredComments);
						this.setState({
							userComments: filteredComments
						});
					});
				}
			});
		});
	};
	render() {
		return (
			<Grid>
				<Typography variant="h3">Bug Reports</Typography>
				<Grid container>
					<List>
						<AppErrorBoundary>
							{this.state.userComments.map((user) => (
								<Grid item xs={12} key={user.createdAt}>
									<ListItem>
										<Paper>
											<Grid>
												<ListItemAvatar>
													<Avatar
														style={{
															width: 50,
															height: 50
														}}
														src={user.imageURL}
														alt={user.userName}
													/>
												</ListItemAvatar>
												<Typography variant="body1">
													Name :- {user.name}
												</Typography>
												<Typography variant="body1">
													Email :- {user.email}
												</Typography>
												<Typography variant="body1">
													Username :- {user.userName}
												</Typography>
												<Typography variant="h6">
													Comment :- {user.feedback}
												</Typography>
											</Grid>
										</Paper>
									</ListItem>
								</Grid>
							))}
						</AppErrorBoundary>
					</List>
				</Grid>
			</Grid>
		);
	}
}

export default BugReports;
