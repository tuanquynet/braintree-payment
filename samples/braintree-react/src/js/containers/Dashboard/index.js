/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage, changeTitle } from '../../actions/app';

import StatWidget from '../../components/Widget';
import {
	PageHeader
} from 'react-bootstrap';

class DashboardPage extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = (e) => {
		e.preventDefault();
	};

	componentDidMount() {
		// this.intervalId = setInterval(() => {
		// 	this.props.changeTitle('Title ' + parseInt(Math.random() * 1000), 10);
		// }, 3000);
	}

	componentWillUnmount() {
		// clearInterval(this.intervalId);
	}

	render() {
		// let store = this.context.store;
		return (
			<div>
				<div className="row">
					<div className="col-lg-12">
						<PageHeader>Dashboard</PageHeader>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-3 col-md-6">
						<StatWidget
							style="panel-primary"
							icon="fa fa-comments fa-5x"
							count="26"
							headerText="New Comments!"
							footerText="View Details"
							linkTo="/"
						/>
					</div>
					<div className="col-lg-3 col-md-6">
						<StatWidget
							style="panel-green"
							icon="fa fa-tasks fa-5x"
							count="12"
							headerText="New Tasks!"
							footerText="View Details"
							linkTo="/"
						/>
					</div>
					<div className="col-lg-3 col-md-6">
						<StatWidget
							style="panel-yellow"
							icon="fa fa-shopping-cart fa-5x"
							count="124"
							headerText="New Orders!"
							footerText="View Details"
							linkTo="/"
						/>
					</div>
					<div className="col-lg-3 col-md-6">
						<StatWidget
							style="panel-red"
							icon="fa fa-support fa-5x"
							count="13"
							headerText="Support Tickets!"
							footerText="View Details"
							linkTo="/"
						/>
					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		language: state.language,
		pageTitle: state.pageTitle || 'Page Title'
	};
}

const mapDispatchToProps = {
	setLanguage,
	changeTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DashboardPage));
