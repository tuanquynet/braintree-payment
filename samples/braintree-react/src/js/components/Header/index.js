/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { hashHistory as history } from 'react-router';

import { setLanguage, logoutRequest } from '../../actions/app';
import {
	NavDropdown,
	MenuItem,
} from 'react-bootstrap';
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar';
import $ from 'jquery';

import MainNavigation from '../MainNavigation';
import {PageNames} from '../../constants';
import auth from '../../helpers/auth';

class Header extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	onClickUserProfile = () => {
		console.log(PageNames);
		const route = PageNames.USER_PROFILE.replace(':recordId', auth.loggedUserId());
		// TODO need to call app.logout before navigate to login page
		history.push(route);
	}

	onClickLogout = () => {
		console.log(PageNames);
		// TODO need to call app.logout before navigate to login page
		// hashHistory.push('/' + PageNames.LOGIN);
		this.props.logoutRequest();
	}

	onClickToggleMenu = () => {
		// TODO: revise toggleMenu logic
		toggleMenu();
	}

	render() {
		return (
			<div id="wrapper" className="content">
				<Navbar fluid={true} style={{ margin: 0 }}>
					<Brand>
						<span>
							{/*<img src={logo} alt="Start React" title="Start React" />*/}
							<span>&nbsp;Moneyoi Admin</span>
							<button type="button" className="navbar-toggle" onClick={this.onClickToggleMenu} style={{ position: 'absolute', right: 0, top: 0 }}>
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</span>
					</Brand>

					<ul className="nav navbar-top-links navbar-right">
						<NavDropdown title={<i className="fa fa-user fa-fw"></i>} id="navDropdown4">
							<MenuItem eventKey="1" onClick={this.onClickUserProfile}>
								<span> <i className="fa fa-user fa-fw"></i> User Profile </span>
							</MenuItem>
							<MenuItem eventKey="2">
								<span><i className="fa fa-gear fa-fw"></i> Settings </span>
							</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey="4" onClick={this.onClickLogout}>
								<span> <i className="fa fa-sign-out fa-fw" /> Logout </span>
							</MenuItem>
						</NavDropdown>

					</ul>
					<MainNavigation />
				</Navbar>
			</div>
		);
	}
}

function toggleMenu() {
	// TODO: avoid using jquery
	if ($('.navbar-collapse').hasClass('collapse')) {
		$('.navbar-collapse').removeClass('collapse');
	}
	else {
		$('.navbar-collapse').addClass('collapse');
	}
}

function mapStateToProps(state) {
	return {
		language: state.language,
		loggedUser: state.loggedUser
	};
}

const mapDispatchToProps = {
	setLanguage,
	logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));
