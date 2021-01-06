import React, { Component } from 'react';
import { AppErrorBoundary } from '../../../Error';
class Profile extends Component {
	render() {
		const { email, password, firstName, lastName, userName } = this.props;
		return (
			<AppErrorBoundary>
				<div>
					<h1>Profile Screen</h1>
					<div>
						{email},{password},{firstName},{lastName},{userName}
					</div>
				</div>
			</AppErrorBoundary>
		);
	}
}

export default Profile;
