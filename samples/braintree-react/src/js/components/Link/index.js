/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage } from '../../actions/app';

import {hashHistory} from 'react-router';


function isLeftClickEvent(event) {
	return event.button === 0;
}

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

	static propTypes = {
		intl: intlShape.isRequired,
		to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
		onClick: PropTypes.func,
	}

	constructor(props) {
		super(props);
	}

	handleClick = (event) => {
		let allowTransition = true;

		if (this.props.onClick) {
			this.props.onClick(event);
		}

		if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
			return;
		}

		if (event.defaultPrevented === true) {
			allowTransition = false;
		}

		event.preventDefault();

		if (allowTransition) {
			if (this.props.to) {
				hashHistory.push(this.props.to);
			} else {
				hashHistory.push({
					pathname: event.currentTarget.pathname,
					search: event.currentTarget.search,
				});
			}
		}
	};

	render() {
		const { to } = this.props; // eslint-disable-line no-use-before-define
		return <a href={'#' + to} children={this.props.children} onClick={this.handleClick} />;
	}
}

function mapStateToProps(state) {
	return {
		language: state.language,
	};
}

const mapDispatchToProps = {
	setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Link));
