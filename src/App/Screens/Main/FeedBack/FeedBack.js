import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import bugReportIcon from '../../../../assets/bugReportsIcon.png';
import commentsIcon from '../../../../assets/commentsIcon.png';
import featureRequestIcon from '../../../../assets/featureRequestIcon.png';
import writeCommentsIcon from '../../../../assets/writeCommentIcon.png';
function FeedBack() {
	return (
		<Grid
			container
			style={{
				display: 'flex',
				height: '90vh',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<Grid
				item
				style={{
					margin: 50
				}}>
				<Link
					style={{
						textDecorationLine: 'none'
					}}
					to='/feedback/comments'>
					<Paper>
						<img
							style={{
								height: 200,
								width: 200
							}}
							src={commentsIcon}
							alt='Comments Icon'
						/>
						<Typography variant='h6'>See Comments</Typography>
					</Paper>
				</Link>
			</Grid>
			<Grid
				item
				style={{
					margin: 50
				}}>
				<Link
					style={{
						textDecorationLine: 'none'
					}}
					to='/feedback/feature'>
					<Paper>
						<img
							style={{
								height: 200,
								width: 200
							}}
							src={featureRequestIcon}
							alt='Feature Request Icon'
						/>
						<Typography variant='h6'>See Feature Requests</Typography>
					</Paper>
				</Link>
			</Grid>
			<Grid
				item
				style={{
					margin: 50
				}}>
				<Link
					style={{
						textDecorationLine: 'none'
					}}
					to='/feedback/bug'>
					<Paper>
						<img
							style={{
								height: 200,
								width: 200
							}}
							src={bugReportIcon}
							alt='Bug Report Icon'
						/>
						<Typography variant='h6'>See Bug Reports</Typography>
					</Paper>
				</Link>
			</Grid>
			<Grid
				item
				style={{
					margin: 50
				}}>
				<Link
					to='/feedback/new'
					style={{
						textDecorationLine: 'none'
					}}>
					<Paper>
						<img
							style={{
								height: 200,
								width: 200
							}}
							src={writeCommentsIcon}
							alt='Write Comment Icon'
						/>
						<Typography variant='h6'>Write a Feedback</Typography>
					</Paper>
				</Link>
			</Grid>
		</Grid>
	);
}

export default FeedBack;
