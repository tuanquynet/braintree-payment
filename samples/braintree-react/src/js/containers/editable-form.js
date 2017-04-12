/* © 2017 Naustud.io
* @author Quy Tran
*/

import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { ButtonToolbar } from 'react-bootstrap';
import { result as lodashResult } from 'lodash';

export function useEditableForm(WrappedComponent) {

	return class EditableForm extends WrappedComponent {
		static propTypes = {
			// indicate this component is wrapped with injectIntl
			pageTitle: PropTypes.string,
			getRecord: PropTypes.func.isRequired,
			countRecords: PropTypes.func.isRequired,
			api: PropTypes.object.isRequired
		}

		constructor(props) {
			super(props);
			this.state = {...this.state};
			this.state = this.state || {};
			this.renderFields = this.renderFields.bind(this);
		}

		componentDidMount() {
			if (super.componentDidMount) {
				super.componentDidMount();
			}

			this._read();
		}

		componentWillReceiveProps(nextProps) {
			console.log('nextProps');
			console.log(nextProps);

			if (super.componentWillReceiveProps) {
				super.componentWillReceiveProps(nextProps);
			}
			const { data } = nextProps;
			this.state = { ...this.state, data };
		}

		_create = () => { }

		_read = () => {
			const { api } = this.props;
			// this.props.params is passed in by ReactRouter
			const { recordId } = this.props.params || {};
			const url = api.read + '/' + recordId + '?' + this._getQueryString();

			this.props.getRecord(url);
		}

		_getQueryString = () => {
			return '';
		}

		_update = (data) => {
			console.log('>>>1');
			const { api } = this.props;
			data = lodashResult(this, 'getData') || this.state.data;
			const { recordId } = this.props.params || {};
			if (!recordId) {
				throw new Error('Require recordId to saveRecord');
			}
			this.props.saveRecord(api.update + `/${recordId}`, data);
		}

		/**
		 * Call to delete record
		 * @return {void}
		 */
		_delete = () => { }

		renderFields() {
			const fields = super.renderFields
				? super.renderFields()
				: (<div></div>);

			const result = <div className="form-group">{fields}</div>;
			return result;
		}

		renderButtonToolbar = () => {
			const value = (
				<ButtonToolbar className="pull-right" style={{margin:20}}>
					<Button type="button" bsStyle="success" >Cancel</Button>
					<Button type="submit" bsStyle="success" >Save</Button>
					{this.onApproved ? (
						<Button type="button" bsStyle="primary" data-set="approved" onClick={this.onApproved}>Approved</Button>

					) : ''}

					{this.onReject ? (
						<Button type="button" bsStyle="danger" data-set="reject" onClick={this.onReject}>Reject</Button>

					) : ''}

				</ButtonToolbar>
			);

			return value;
		}

		_renderPageTitle = () => {
			const pageTitle = (
				this.props.pageTitle ?
					<div className="col-lg-12">
						<PageHeader>{this.props.pageTitle}</PageHeader>
					</div>
					: ''
			);

			return pageTitle;
		}

		_renderForm() {
			return (
				<div className="col-lg-12">
					<form role="form" onSubmit={this.onSubmitForm}>
						<fieldset>
							{this.renderFields()}
							{this.renderButtonToolbar()}
						</fieldset>
					</form>
				</div>
			);
		}

		render() {
			// ... and renders the wrapped component with the fresh data!
			// Notice that we pass through any additional props

			return (
				<div className="row">
					{this._renderPageTitle()}
					{this._renderForm()}
				</div>
			);
		}
	};

}
