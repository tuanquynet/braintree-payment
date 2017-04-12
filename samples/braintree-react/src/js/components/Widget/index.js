/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage } from '../../actions/app';

import { Panel } from 'react-bootstrap';
import Link from '../Link';

// import classNames from 'classnames';

class Widget extends Component {

	static propTypes = {
		intl: intlShape.isRequired,
		style: React.PropTypes.string,
		count: React.PropTypes.string,
		headerText: React.PropTypes.string,
		icon: React.PropTypes.string,
		footerText: React.PropTypes.string,
	}

	constructor(props) {
		super(props);
	}

	render() {
		let style = this.props.style;

		return (
			<Panel
				className={'stat ' + style}
				header={<div className="row">
					<div className="col-xs-3">
						<i className={this.props.icon} />
					</div>
					<div className="col-xs-9 text-right">
						<div className="huge">
							{
								this.props.count
							}
						</div>
						<div>
							{
								this.props.headerText
							}
						</div>
					</div>
				</div>}

				footer={
					<Link
						to={
							this.props.linkTo // eslint-disable-line
						}
					>
						<span className="pull-left">
							{
								this.props.footerText
							}
						</span>
						<span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
						<div className="clearfix" />
					</Link>}
			/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Widget));
