/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage, getUsers, countUsers, saveUserInListing } from '../../actions/user';
import { useListingPage } from '../listing-page';
import config from '../../config';
import { DataTypes, Status } from '../../constants';
import { ButtonGroup, Button, Glyphicon, Image } from 'react-bootstrap';
import { hashHistory as history } from 'react-router';
import {PageNames} from '../../constants';

class UserListing extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
		/* eslint-disable react/no-direct-mutation-state */
		this.state.columns = [
			{
				fieldName: 'username',
				title: 'User Name',
				key: true,
				isSortable: true,
			},
			{
				fieldName: 'email',
				title: 'Email',
				isSortable: true,
			},
			{
				fieldName: 'dob',
				title: 'Date of Birth',
				type: DataTypes.DATE,
				isSortable: true,
			},
			{
				fieldName: 'gender',
				title: 'Gender',
				isSortable: true,
			},
			{
				fieldName: 'avatar',
				title: 'Avatar',
				formatter: (value/*, rowData*/) => {
					const content = (
						<Image style={{ 'maxWidth': '50px', 'maxHeight': '50px' }} src={value} responsive alt="avatar" />
					);

					return content;
				}
			},
			{
				fieldName: 'credit',
				title: 'Credit',
				type: DataTypes.NUMBER
			},
			{
				fieldName: 'status',
				title: 'Status',
				formatter: (value) => {
					return value === Status.ACTIVE
							? 'active'
							: (value === Status.INACTIVE ? 'inactive' : '');
				}
			},
		];
		this.addCustomColumns(this.state.columns);
		/* eslint-enable react/no-direct-mutation-state */
	}

	addCustomColumns(columns) {
		columns.push({
			fieldName: 'action',
			title: 'Action',
			formatter: (value, rowData) => {
				const key = rowData.id;
				const content = (
					<ButtonGroup>
						<Button className="primary" data-key={key + '--edit'} onClick={this.onClickEdit}><Glyphicon glyph="edit" /></Button>
						<Button className="danger" data-key={key + '--remove'} onClick={this.onClickDelete}><Glyphicon glyph="remove" /></Button>
					</ButtonGroup>
				);
				return content;
			}
		});
	}

	onClickEdit = (e) => {
		const target = e.currentTarget;
		let key = target.getAttribute('data-key');
		[key] = key.split('--');
		const route = PageNames.USER_EDIT.replace(':recordId', key || '');
		history.push(route);
	}

	onClickDelete = (e) => {
		const target = e.currentTarget;
		let key = target.getAttribute('data-key');
		[key] = key.split('--');

		this._delete(key);
	}

	render() {
		return (
			<div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	const {
		language,
		api = {
			read: config.USER_URL,
			create: config.USER_URL,
			delete: config.USER_URL,
			update: config.USER_URL
		},
		users
	} = state;

	return {
		language,
		pageTitle: 'Users',
		api,
		totalRecords: users.totalRecords,
		data: users.users || [],
	};
};

const mapDispatchToProps = {
	setLanguage,
	getRecords: getUsers,
	countRecords: countUsers,
	saveRecord: saveUserInListing,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(useListingPage(UserListing)));
