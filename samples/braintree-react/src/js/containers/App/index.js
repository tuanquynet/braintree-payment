/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, {Component} from 'react';

import Header from '../../components/Header';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div id="page-wrapper" className="page-wrapper" >{this.props.children}</div>
			</div>
		);
	}
}

export default App;
