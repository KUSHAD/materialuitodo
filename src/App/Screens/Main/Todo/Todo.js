import React, { Component } from 'react';
import { AppErrorBoundary } from '../../../Error';

class Todo extends Component {
	render() {
		return (
			<AppErrorBoundary>
				<div>
					<h1>Todo Screen</h1>
				</div>
			</AppErrorBoundary>
		);
	}
}

export default Todo;
