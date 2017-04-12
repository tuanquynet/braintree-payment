/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage } from '../../actions/app';

class AppLoading extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	render() {
		return (
			<div>Loading...</div>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AppLoading));
