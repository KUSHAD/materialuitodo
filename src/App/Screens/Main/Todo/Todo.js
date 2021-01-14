import {
	Button,
	Fab,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { firebaseAuth, firebaseFirestore } from '../../../../imports';
import { AppErrorBoundary } from '../../../Error';
function Todo() {
	const [modalOpen, setModalOpen] = useState(false);
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const [displayTodos, setDisplayTodos] = useState([]);
	const addTodo = () => {
		firebaseFirestore
			.collection(firebaseAuth.currentUser.uid)
			.add({
				title: noteTitle,
				content: noteContent,
				id: '',
			})
			.then((res) => {
				console.log('success');
				firebaseFirestore
					.collection(firebaseAuth.currentUser.uid)
					.doc(res.id)
					.update({
						id: res.id,
					})
					.then(() => {
						console.log('successfully updated row id');
						setNoteTitle('');
						setNoteContent('');
						setModalOpen(false);
					})
					.catch((e) => console.log('err', e.message));
			})
			.catch((e) => console.log('err', e.message));
	};
	useEffect(() => {
		firebaseFirestore
			.collection(firebaseAuth.currentUser.uid)
			.get()
			.then((data) => {
				data.forEach((data) => {
					if (data.exists) {
						console.log(data.data());
						setDisplayTodos(data.data());
					} else {
						console.log('does not exist');
					}
				});
			});
	}, []);
	return (
		<>
			<Paper>
				{/* <AppErrorBoundary>
					{displayTodos.map((todo) => (
						<Typography>{todo.title}</Typography>
					))}
				</AppErrorBoundary> */}
			</Paper>
			<Fab
				onClick={() => setModalOpen(true)}
				style={{
					margin: 0,
					top: 'auto',
					right: 20,
					bottom: 20,
					left: 'auto',
					position: 'fixed',
				}}
				color="primary"
			>
				<Add />
			</Fab>
			<Modal
				style={{
					outline: 0,
				}}
				open={modalOpen}
			>
				<AppErrorBoundary>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Paper
							style={{
								height: '75vh',
								width: '100vw',
								outline: 0,
							}}
						>
							<Typography
								variant="h6"
								style={{
									textAlign: 'center',
								}}
							>
								Write Your Todo
							</Typography>
							<center>
								<div
									style={{
										width: '80%',
									}}
								>
									<TextField
										value={noteTitle}
										onChange={(e) => setNoteTitle(e.target.value)}
										fullWidth
										variant="outlined"
										label="Todo Title"
										required
									/>
									<TextField
										value={noteContent}
										onChange={(e) => setNoteContent(e.target.value)}
										fullWidth
										variant="outlined"
										label="Todo Contents"
										required
										style={{
											marginTop: 15,
										}}
										multiline
										rows={15}
									/>
								</div>
							</center>
							<center>
								<Button
									variant="contained"
									style={{
										backgroundColor: 'red',
										color: '#fff',
										margin: 15,
									}}
									focusRipple
									onClick={() => setModalOpen(false)}
								>
									X Close
								</Button>
								<Button
									variant="contained"
									style={{
										margin: 15,
									}}
									color="primary"
									disabled={!noteTitle || !noteContent}
									onClick={addTodo}
								>
									<Add /> Todo
								</Button>
							</center>
						</Paper>
					</div>
				</AppErrorBoundary>
			</Modal>
		</>
	);
}

export default Todo;
