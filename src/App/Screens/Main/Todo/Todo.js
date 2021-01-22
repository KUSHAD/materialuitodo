import {
	Button,
	Fab,
	Grid,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import UpdateIcon from '@material-ui/icons/Update';
import React, { useEffect, useState } from 'react';
import {
	firebaseAuth,
	firebaseFirestore,
	firebaseFirestoreTimestamp,
} from '../../../../imports';
import { AppErrorBoundary } from '../../../Error';

function Todo() {
	const [modalOpen, setModalOpen] = useState(false);
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const [displayTodos, setDisplayTodos] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const addTodo = () => {
		firebaseFirestore
			.collection(firebaseAuth.currentUser.uid)
			.add({
				title: noteTitle,
				content: noteContent,
				id: '',
				createdAt: firebaseFirestoreTimestamp,
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
						window.location.reload();
					})
					.catch((e) => console.log('err', e.message));
			})
			.catch((e) => console.log('err', e.message));
	};
	useEffect(() => {
		firebaseFirestore
			.collection(firebaseAuth.currentUser.uid)
			.orderBy('createdAt')
			.get()
			.then((data) => {
				if (!data.empty) {
					let todos = [];
					data.forEach((doc) => {
						todos.push({
							todoId: doc.data().id,
							title: doc.data().title,
							body: doc.data().content,
							createdAt: doc.data().createdAt,
						});
						setDisplayTodos(todos);
					});
				} else {
					console.log('does not exist');
				}
			});
	}, []);
	const deleteTodo = (row) => {
		firebaseFirestore
			.collection(firebaseAuth.currentUser.uid)
			.doc(row)
			.delete()
			.then((res) => {
				console.log('deleted Succesfully');
				window.location.reload();
			})
			.catch((err) => {
				console.log('err deleting todo -->', err.message);
			});
	};
	return (
		<>
			<AppErrorBoundary>
				<Grid container>
					{displayTodos.map((todo) => (
						<Grid
							style={{
								margin: 2,
								textAlign: 'center',
							}}
							item
							xs={12}
							key={todo.todoId}
						>
							<Paper>
								<Typography variant="h4">{todo.title}</Typography>
								<Typography variant="body1">{todo.body}</Typography>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center',
									}}
								>
									<Button
										onClick={() => {
											setNoteTitle(todo.title);
											setNoteContent(todo.body);
											setViewModal(true);
										}}
									>
										View
									</Button>
									<Button
										onClick={() => {
											setNoteTitle(todo.title);
											setNoteContent(todo.body);
											setIsUpdate(true);
											setModalOpen(true);
										}}
									>
										Update
									</Button>
									<Button onClick={() => deleteTodo(todo.todoId)}>
										Delete
									</Button>
								</div>
							</Paper>
						</Grid>
					))}
				</Grid>
			</AppErrorBoundary>
			<Fab
				onClick={() => {
					setIsUpdate(false);
					setModalOpen(true);
				}}
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
								height: '75%',
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
								{isUpdate ? 'Update This Todo' : 'Write Your Todo'}
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
									onClick={() => {
										setModalOpen(false);
										setNoteContent('');
										setNoteTitle('');
									}}
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
									{isUpdate ? (
										<div>
											<UpdateIcon /> Update
										</div>
									) : (
										<div>
											<Add /> Add
										</div>
									)}
								</Button>
							</center>
						</Paper>
					</div>
				</AppErrorBoundary>
			</Modal>
			<Modal
				style={{
					outline: 0,
				}}
				open={viewModal}
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
								height: '75%',
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
								View This Todo
							</Typography>
							<center>
								<div
									style={{
										width: '80%',
									}}
								>
									<TextField
										disabled
										value={noteTitle}
										onChange={(e) => setNoteTitle(e.target.value)}
										fullWidth
										variant="outlined"
										label="Todo Title"
										required
									/>
									<TextField
										disabled
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
									onClick={() => {
										setViewModal(false);
										setNoteContent('');
										setNoteTitle('');
									}}
								>
									X Close
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
