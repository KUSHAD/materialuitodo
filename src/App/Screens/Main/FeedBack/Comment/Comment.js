import {
	Avatar,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Paper,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';
import { firebaseRealTimeDatabase } from '../../../../../imports';
class Comments extends Component {
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
		firebaseRealTimeDatabase.ref('comment/').on('value', (data) => {
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
				<Typography variant="h3">User Comments</Typography>
				<Grid container>
					<List>
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
					</List>
				</Grid>
			</Grid>
		);
	}
}

export default Comments;
