import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SideNavComponent } from '../../Components';
import { AppErrorBoundary } from '../../Error';
import { fetchUser } from '../../Services/actions';
const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
	bindActionCreators({ fetchUser }, dispatch);

class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		const { currentUser } = this.props;
		console.log(currentUser);
		return (
			<>
				<AppErrorBoundary>
					<SideNavComponent
						userName={currentUser.userName}
						lastName={currentUser.lastName}
						firstName={currentUser.firstName}
						email={currentUser.email}
						password={currentUser.password}
					/>
				</AppErrorBoundary>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchProps)(Main);
