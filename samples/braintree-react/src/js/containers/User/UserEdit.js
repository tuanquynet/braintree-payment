/* © 2017 Naustud.io
* @author Quy Tran
*/

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { getUser, countUsers, saveEditingUser, getUserRoles, getRoles } from '../../actions';
import config from '../../config';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Radio from 'react-bootstrap/lib/Radio';
import Image from 'react-bootstrap/lib/Image';

import { useEditableForm } from '../editable-form';
import { Gender, RoleNames } from '../../constants';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { find as _find, reduce as _reduce, filter as _filter} from 'lodash';
import { AppFlowActions, PageNames } from '../../constants';

function FieldGroup({ id, label, help, ...props }) {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
}

class UserEdit extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	componentDidMount() {
		this.getRoles();
		this.getUserRoles();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.actions) {
			const { actions } = nextProps;
			const [firstAction = {}] = actions;
			if (firstAction.type === AppFlowActions.SAVE_EDITING_USER_COMPLETE) {
				toastr.success('Edit User', 'Save editing user successfully.');
				hashHistory.push(PageNames.USER_LISTING);
			}
		}
	}

	onChangeFieldValue = (e) => {

		let {data: newData} = this.state;
		let fieldName = e.target.name;

		switch (fieldName) {
			default:
				newData[fieldName] = e.target.value;
				break;
		}

		this.setState({data: {...newData}});
	}

	onChangeDoB = (data) => {
		let { data: newData } = this.state;
		let fieldName = 'dob';
		switch (fieldName) {
			default:
				newData[fieldName] = data.toISOString();
				break;
		}

		this.setState({ data: { ...newData } });
	}

	onFocusChange = (e) => {
		this.setState({ dobFocused: e.focused });
	}

	onAvatarChange = (e) => {
		const {files} = e.target;
		let reader = new FileReader();
		let {data: newData} = this.state;
		reader.onload = (readerEvent) => {
			const dataUrl = readerEvent.target.result;
			newData.avatar = dataUrl;
			this.setState({data: {...newData}});
		};

		reader.readAsDataURL(files[0]);
	}

	onChangeRole = (values) => {
		let { data: newData } = this.state;
		let {roles = []} = this.props;
		let fieldName = 'roles';
		console.log('values');
		console.log(values);
		values = _reduce(values, (sum, item) => {
			return sum + item.value + ',';
		}, ',');
		switch (fieldName) {
			default:
				newData[fieldName] = _filter(roles, (role) => {
					return values.indexOf(',' + role.id + ',') > -1;
				});
				break;
		}

		this.setState({ data: { ...newData } });
	}

	onSubmitForm = (e) => {
		e.preventDefault();
		const {recordId} = this.props.params;
		if (recordId) {
			this._update(this.state.data);
		} else {
			this._create();
		}
	}

	getRoles = () => {
		const { readRoles } = this.props.api;
		this.props.getRoles(readRoles);
	}

	getUserRoles = () => {
		const { read } = this.props.api;
		const { recordId } = this.props.params;
		this.props.getUserRoles(read + `/${recordId}/roles`);
	}

	isOutsideRangeDate = () => {
		return false;
	}

	renderRoles = () => {
		const { data = {} } = this.state;
		const roles = this.props.roles || [];
		let { roles: userRoles } = data;
		const normalRole = _find(roles, (role) => {
			return role.name === RoleNames.NORMAL;
		}) || {};
		userRoles = !userRoles || !userRoles.length ? [normalRole] : userRoles;
		const selectedRoleIds = userRoles.map((role) => {
			return role.id;
		}) || [];
		const roleOptions = roles.map((role) => {
			return {
				value: role.id,
				label: role.name,
			};
		});

		let content = (
			<FormGroup controlId="formControlsSelect">
				<ControlLabel>Role</ControlLabel>
				<Select
					multi={true}
					joinValues={true}
					name="roles"
					value={selectedRoleIds.join()}
					options={roleOptions}
					onChange={this.onChangeRole}
				/>
			</FormGroup>
		);
		return content;
	}

	renderFields = () => {
		const Moment = moment;
		const {data = {}} = this.state;
		let { avatar } = data || {};
		avatar = avatar || config.DEFAULT_AVATAR;
		let dob = (data || {}).dob;
		dob = dob ? new Moment(new Date(dob)) : null;

		const result = (
			<div className="user-edit">
				<ControlLabel htmlFor="profile-avatar">
					<Image className="profile-avatar" src={avatar} width="200" height="200" rounded />
				</ControlLabel>

				<FormControl
					id="profile-avatar"
					type="file"
					className="user-avatar hidden"
					onChange={this.onAvatarChange}
				/>

				<div>
					<FieldGroup
						type="text"
						label="User Name"
						className="form-control"
						placeholder="User name"
						name="username"
						value={data.username || ''}
						onChange={this.onChangeFieldValue}
					/>
					<FieldGroup
						type="text"
						label="Email"
						className="form-control"
						placeholder="Email"
						name="email"
						value={data.email}
						onChange={this.onChangeFieldValue}
					/>
					<FormGroup >
						<Radio
							inline
							name="gender"
							value={Gender.MALE}
							checked={data.gender === Gender.MALE}
							onChange={this.onChangeFieldValue}
						>
							{Gender.MALE}
						</Radio>
						<Radio
							inline
							name="gender"
							value={Gender.FEMALE}
							checked={data.gender === Gender.FEMALE}
							onChange={this.onChangeFieldValue}
						>
							{Gender.FEMALE}
						</Radio>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Date of Birth</ControlLabel><br/>
						<SingleDatePicker
							id="user.dob"
							disabled={false}
							numberOfMonths={1}
							date={dob} // momentPropTypes.momentObj or null
							onDateChange={this.onChangeDoB} // PropTypes.func.isRequired
							focused={this.state.dobFocused}
							onFocusChange={this.onFocusChange}
							isOutsideRange={this.isOutsideRangeDate}
						/>
					</FormGroup>
					{this.renderRoles()}
				</div>
			</div>
		);
		return result;
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
			update: config.USER_URL,
			readRoles: config.ROLE_URL,
		},
		rolesData,
		tracking,
		editingUser = { username: '', email: '', gender: '' }
	} = state;

	return {
		pageTitle: 'Edit User',
		language,
		api,
		roles: rolesData.roles,
		actions: tracking && tracking.actions,
		data: editingUser
	};
};

const mapDispatchToProps = {
	getRecord: getUser,
	saveRecord: saveEditingUser,
	countRecords: countUsers,
	createRecord: () => {},
	getRoles: getRoles,
	getUserRoles: getUserRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(useEditableForm(UserEdit)));
