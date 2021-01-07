import { Component } from 'react';
import { SideNavComponent } from '../../Components';
import { AppErrorBoundary } from '../../Error';
class Main extends Component {
	render() {
		return (
			<>
				<AppErrorBoundary>
					<SideNavComponent />
				</AppErrorBoundary>
			</>
		);
	}
}

export default Main;
