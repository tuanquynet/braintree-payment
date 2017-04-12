/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, {Component} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {setLanguage} from '../../actions/app';

import classNames from 'classnames';

import {hashHistory as history} from 'react-router';
import {PageNames} from '../../constants';

class MainNavigation extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			uiElementsCollapsed: true,
			chartsElementsCollapsed: true,
			multiLevelDropdownCollapsed: true,
			thirdLevelDropdownCollapsed: true,
			samplePagesCollapsed: true
		};
	}

	onClickUIElement = (e) => {
		e.preventDefault();
		this.setState({
			uiElementsCollapsed: !this.state.uiElementsCollapsed
		});
		return false;
	}

	onClickDashboard = (e) => {
		e.preventDefault();
		history.push(PageNames.DASHBOARD);
	}

	onClickUser = (e) => {
		e.preventDefault();
		history.push(PageNames.USER_LISTING);
	}

	render() {
		return (
			<div className="navbar-default sidebar" style={{
				marginLeft: '-20px'
			}} role="navigation">
				<div className="sidebar-nav navbar-collapse collapse">
					<ul className="nav in" id="side-menu">
						<li>
							<a href="" onClick={this.onClickDashboard}>
								<i className="fa fa-dashboard fa-fw"/>
								&nbsp;Dashboard
							</a>
						</li>
						<li>
							<a href="" onClick={this.onClickUser}>
								<i className="fa fa-table fa-fw"/>
								&nbsp;User
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {language: state.language};
}

const mapDispatchToProps = {
	setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MainNavigation));
