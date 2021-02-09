import {
	AppBar,
	Avatar,
	Button,
	CssBaseline,
	Dialog,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	Toolbar,
	Typography
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Share } from '@material-ui/icons';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import GetAppIcon from '@material-ui/icons/GetApp';
import MenuIcon from '@material-ui/icons/Menu';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import React, { useEffect, useState } from 'react';
import { useReactPWAInstall } from 'react-pwa-install';
import { BrowserRouter, Route } from 'react-router-dom';
import appLogo from '../../../assets/favicon.png';
import { firebaseAuth, firebaseFirestore } from '../../../imports';
import { AppErrorBoundary } from '../../Error';
import { FeedBackScreen, ProfileScreen, TodoScreen } from '../../Screens/Main';
import {
	BugReportsSectionScreen,
	CommentSectionScreen,
	FeatureRequestSectionScreen,
	WriteFeedbackScreen
} from '../../Screens/Main/FeedBack';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

function SideNav(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [country, setCountry] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [shareModalOpen, setShareModalOpen] = useState(false);
	const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onSignOut = () => {
		firebaseAuth
			.signOut()
			.then(() => console.log('success'))
			.catch(err => console.log('error', err));
	};

	useEffect(() => {
		firebaseFirestore
			.collection('users')
			.doc(firebaseAuth.currentUser.uid)
			.get()
			.then(user => {
				if (user.exists) {
					let userData = user.data();
					setFirstName(userData.firstName);
					setLastName(userData.lastName);
					setEmail(userData.email);
					setUserName(userData.userName);
					setProfileImage(userData.downloadURL);
					setPhoneNumber(userData.phoneNumber);
					setCountry(userData.country);
					setZipCode(userData.zipCode);
				} else {
					console.log('User Does Not Exist');
				}
			});
	}, []);
	const handlePWAInstallButtonClick = () => {
		pwaInstall({
			title: 'Install Mui-Todo On Your Device',
			logo: appLogo,
			features: (
				<ul>
					<li>Add Mui-Todo On Your Homescreen or Desktop</li>
					<li>Add Your Todos Directly From Your Homescreen</li>
					<li>Sync Your Todos and Notes With Multiple Devices</li>
					<li>Works offline</li>
				</ul>
			),
			description: `A modern Todo App Made Using React , Material-ui and uses Firebase Hosting , Firebase Firestore , Firebase storage , Firebase Real time Database and Firebase Authentication Now Works Offline !!!`
		})
			.then(() => window.location.reload())
			.catch(() => console.log('User Opted Out From Installing'));
	};
	const shareApp = () => {
		if (navigator.share) {
			navigator.share({
				title: 'Share Mui-Todo',
				text: `Hey Guys I Use This Awesome App Called Mui-Todo. Link Below`,
				url: 'https://mui-todo.web.app'
			});
		} else {
			setShareModalOpen(true);
		}
	};
	const shareTextCopy = () => {
		const text = `Hey Guys I Use This Awesome App Called Mui-Todo. Check This App Now at https://mui-todo.web.app`;
		navigator.clipboard.writeText(text).then(
			function () {
				console.log('Async: Copying to clipboard was successful!');
				setShareModalOpen(false);
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	};
	const drawer = (
		<div>
			<AppErrorBoundary>
				<div className={classes.toolbar} />
				<List>
					<ListItem
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}>
						<ListItemAvatar>
							<Avatar
								style={{
									height: '200px',
									width: '200px'
								}}
								src={profileImage}
								alt={firstName}
							/>
						</ListItemAvatar>
						<Typography
							style={{
								textAlign: 'center'
							}}>
							{firstName} {lastName}
						</Typography>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem>
						<Button href='/' fullWidth>
							<NoteOutlinedIcon />
							Todos
						</Button>
					</ListItem>
					<ListItem>
						<Button href='/profile' fullWidth>
							<AccountBoxOutlinedIcon /> Profile
						</Button>
					</ListItem>
					<Divider />
					<ListItem>
						<Button href='/feedback' fullWidth>
							<FeedbackIcon />
							Feedback
						</Button>
					</ListItem>
					<Divider />
					<ListItem>
						<Button fullWidth onClick={onSignOut}>
							<ExitToAppIcon /> Logout
						</Button>
					</ListItem>
					<Divider />
					{supported() && !isInstalled() && (
						<Button
							fullWidth
							onClick={handlePWAInstallButtonClick}
							style={{
								backgroundColor: '#00ff11',
								color: '#fff'
							}}>
							<GetAppIcon />
							Install
						</Button>
					)}
					<Button onClick={shareApp} fullWidth>
						<Share /> Share This App
					</Button>
					<ListItem
						style={{
							margin: 0,
							bottom: 'auto',
							// right: 20,
							left: 'auto',
							position: 'fixed'
						}}>
						<Typography variant='body2'>
							Your Id:- {firebaseAuth.currentUser.uid}
						</Typography>
					</ListItem>
				</List>
			</AppErrorBoundary>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<AppErrorBoundary>
				<CssBaseline />
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap>
							Mui-Todo
						</Typography>
						{supported() && !isInstalled() && (
							<Button
								onClick={handlePWAInstallButtonClick}
								style={{
									backgroundColor: '#00ff11',
									color: '#fff',
									margin: 0,
									top: 'auto',
									right: 20,
									left: 'auto',
									position: 'fixed'
								}}>
								<GetAppIcon />
								Install
							</Button>
						)}
						<IconButton
							style={{
								margin: 0,
								top: 'auto',
								right: 120,
								left: 'auto',
								position: 'fixed'
							}}
							onClick={shareApp}
							color='inherit'>
							<Share />
						</IconButton>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					<Hidden smUp implementation='css'>
						<Drawer
							container={container}
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant='permanent'
							open>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<BrowserRouter>
						<Route path='/' exact component={TodoScreen} />
						<Route
							path='/profile'
							component={() => (
								<ProfileScreen
									email={email}
									firstName={firstName}
									lastName={lastName}
									userName={userName}
									zipCode={zipCode}
									country={country}
									phoneNumber={phoneNumber}
									imageURL={profileImage}
								/>
							)}
						/>
						<Route path='/feedback' component={FeedBackScreen} exact />
						<Route
							path='/feedback/new'
							component={() => (
								<WriteFeedbackScreen
									imageURL={profileImage}
									email={email}
									firstName={firstName}
									lastName={lastName}
									userName={userName}
								/>
							)}
							exact
						/>
						<Route
							path='/feedback/comments'
							component={CommentSectionScreen}
							exact
						/>
						<Route
							path='/feedback/bug'
							component={BugReportsSectionScreen}
							exact
						/>
						<Route
							path='/feedback/feature'
							component={FeatureRequestSectionScreen}
							exact
						/>
					</BrowserRouter>
				</main>
			</AppErrorBoundary>
			<Dialog
				style={{
					textAlign: 'center'
				}}
				open={shareModalOpen}>
				<Typography variant='h6'>
					Sad To Say But Your Browser Doesn't Support Web Sharing
				</Typography>
				<Typography variant='h6'>Don't Worry Click The Button Below</Typography>
				<Typography variant='h6'>
					It Will Copy A Text And Then Share It With Your Friends
				</Typography>
				<Button onClick={shareTextCopy} variant='contained' color='primary'>
					Copy Text
				</Button>
				<Button
					onClick={() => setShareModalOpen(false)}
					variant='contained'
					color='secondary'>
					Close
				</Button>
			</Dialog>
		</div>
	);
}

export default SideNav;
