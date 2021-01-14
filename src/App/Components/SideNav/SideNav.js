import {
	AppBar,
	Avatar,
	Button,
	CssBaseline,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { firebaseAuth, firebaseFirestore } from '../../../imports';
import { AppErrorBoundary } from '../../Error';
import { ProfileScreen, TodoScreen } from '../../Screens/Main';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
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
	const [password, setPassword] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [country, setCountry] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onSignOut = () => {
		firebaseAuth
			.signOut()
			.then(() => console.log('success'))
			.catch((err) => console.log('error', err));
	};

	useEffect(() => {
		firebaseFirestore
			.collection('users')
			.doc(firebaseAuth.currentUser.uid)
			.get()
			.then((user) => {
				if (user.exists) {
					let userData = user.data();
					setFirstName(userData.firstName);
					setLastName(userData.lastName);
					setPassword(userData.password);
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

	const drawer = (
		<div>
			<AppErrorBoundary>
				<div className={classes.toolbar} />
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								style={{
									height: '200px',
									width: '200px',
								}}
								src={profileImage}
								alt={firstName}
							/>
						</ListItemAvatar>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem>
						<Button href="/" fullWidth>
							<NoteOutlinedIcon />
							Todos
						</Button>
					</ListItem>
					<ListItem>
						<Button href="/profile" fullWidth>
							<AccountBoxOutlinedIcon /> Profile
						</Button>
					</ListItem>
					<ListItem>
						<Button fullWidth onClick={onSignOut}>
							<ExitToAppIcon /> Logout
						</Button>
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
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							MATERIAL UI TODO
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<BrowserRouter>
						<Route path="/" exact component={TodoScreen} />
						<Route
							path="/profile"
							component={() => (
								<ProfileScreen
									email={email}
									password={password}
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
						<Redirect to="/" />
					</BrowserRouter>
				</main>
			</AppErrorBoundary>
		</div>
	);
}

export default SideNav;
