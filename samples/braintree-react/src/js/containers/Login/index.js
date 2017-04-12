/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage, loginRequest } from '../../actions/app';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormControl, Checkbox } from 'react-bootstrap';

class Login extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	constructor() {
		super();
		this.state = {
			username: ''
		};
	}

	onSubmitForm = (e) => {
		e.preventDefault();
		const {username, password} = this.state;
		this.props.loginRequest({username, password});
	};

	onChangeUsername = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	};

	onChangePassword = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	};

	render() {
		// context.setTitle(title);
		const {username = ''} = this.state;
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="text-center">
					<h1 className="login-brand-text">Welcome to Moneyoi Admin</h1>
				</div>

				<Panel header={<h3>Please Sign In</h3>} className="login-panel">
					<form role="form" onSubmit={this.onSubmitForm}>
						<fieldset>
							<div className="form-group">
								<FormControl
									type="text"
									className="form-control"
									placeholder="Username"
									name="name"
									value={username}
									onChange={this.onChangeUsername}
								/>
							</div>

							<div className="form-group">
								<FormControl
									className="form-control"
									placeholder="Password"
									type="password"
									name="password"
									onChange={this.onChangePassword}
								/>
							</div>
							<Checkbox label="Remember Me" > Remember Me </Checkbox>
							<Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
						</fieldset>
					</form>

				</Panel>

			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		language: state.language,
	};
}

const mapDispatchToProps = {
	setLanguage,
	loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));
