/* © 2017 Naustud.io
* @author Quy Tran
*/
import React, { PropTypes } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import { DataTypes, Status } from '../constants';
import config from '../config';
import { forEach } from 'lodash';

// This function takes a component...
export function useListingPage(WrappedComponent) {
	// ...and returns another component...
	return class ListingPage extends WrappedComponent {
		static propTypes = {
			// indicate this component is wrapped with injectIntl
			pageTitle: PropTypes.string,
			getRecords: PropTypes.func.isRequired,
			saveRecord: PropTypes.func.isRequired,
			countRecords: PropTypes.func.isRequired,
			api: PropTypes.object.isRequired
		}

		constructor(props) {
			super(props);
			this.state = {...this.state, pageNum: 1, perPage: config.pagination.perPage, order: [] };
		}

		componentDidMount() {
			super.componentDidMount();
			// ... that takes care of the subscription...
			this._count();
			this._read();
		}

		_create = () => { }

		_read = () => {
			const url = this.props.api.read + '?' + this._getQueryString();
			this.props.getRecords(url);
		}

		_count = () => {
			const url = this.props.api.read + '/count';
			this.props.countRecords(url);
		}

		_getQueryString = () => {
			const { pageNum = 1, perPage = config.pagination.perPage } = this.state;
			const skip = perPage * (pageNum - 1);
			const filter = {
				limit: perPage,
				skip,
				order: this.state.order,
				where: this.state.filter
			};
			const qs = 'filter=' + encodeURI(JSON.stringify(filter));
			return qs;
		}

		_onPageChange = (pageNum, perPage) => {
			this.state = ({
				...this.state,
				perPage,
				pageNum
			});
			this._read();
		}

		_onPerPageListChange = (perPage) => {
			this.state = ({
				...this.state,
				perPage: perPage
			});
			this._read();
		}

		_onSortChange = (sortName, sortOrder) => {
			this.state.order = [sortName + ' ' + sortOrder.toUpperCase()];
			this._read();
		}

		/**
		 * This is handler of filter change of table component
		 * @param {object} filterObj {fieldName: {type: string,...}}
		 * @return {object} such as {fieldName: {operator: value}}
		 */
		_onFilterChange = (filterObj) => {
			const filter = {};
			forEach(filterObj, (item, key) => {
				switch (item.type) {
					case 'TextFilter':
						filter[key] = { like: item.value };
						break;
				}
			});
			this.state.filter = filter;
			this._read();
		}

		_update = (recordId, data) => {
			const refreshUrl = this.props.api.read + '?' + this._getQueryString();
			const url = this.props.api.update + '/' + recordId;
			this.props.saveRecord(
				url,
				{
					...data
				},
				{
					url: refreshUrl
				}
			);
		}

		/**
		 * Call to delete record
		 * @param {string} recordId id of record to be deleted
		 * @return {void}
		 */
		_delete = (recordId) => {
			const refreshUrl = this.props.api.read + '?' + this._getQueryString();
			const url = this.props.api.update + '/' + recordId;
			this.props.saveRecord(
				url,
				{
					status: Status.INACTIVE
				},
				{
					url: refreshUrl
				}
			);
		}

		applyDataFormatter(columns) {
			return columns.map((item) => {
				item.formatter = item.formatter || (item.type === DataTypes.DATE ? this.dateFormatter : value => value);
				return item;
			});
		}

		/**
		 * Generate correct filter format supported by react-bootstrap-table
		 * @param {object} column it is column format
		 * @return {object} ex: {type: 'TextFilter'}
		 */
		_getFilterType = (column) => {
			const filter = {};
			if (column.isFilterable) {
				switch (column.type) {
					case DataTypes.DATE:
						filter.type = 'DateFilter';
						break;
					default:
						filter.type = 'TextFilter';
				}
			}
			return filter;
		}

		_renderDatatable = () => {
			let dataSource = this.props.data || [];
			const columns = this.applyDataFormatter(this.state.columns || []);
			const datatableOption = {
				sizePerPage: this.state.perPage,
				onPageChange: this._onPageChange,
				sizePerPageList: [10, 20, 50],
				page: this.state.pageNum,
				onSizePerPageList: this._onPerPageListChange,
				onSortChange: this._onSortChange,
				onFilterChange: this._onFilterChange
			};
			const content = columns.length ? (
				<div className="col-lg-12">
					<BootstrapTable
						data={dataSource}
						striped={true}
						hover={true}
						fetchInfo={{ dataTotalSize: this.props.totalRecords }}
						options={datatableOption}
						remote={true} pagination={true} >
						{columns.map((item) => {
							return (
								<TableHeaderColumn
									key={item.fieldName}
									dataField={item.fieldName}
									isKey={!!item.key}
									dataAlign="center"
									dataFormat={item.formatter}
									dataSort={item.isSortable}
									filter={this._getFilterType(item)} >
									{item.title}

								</TableHeaderColumn>
							);
						})}
					</BootstrapTable>
				</div>
			) : (<div className="col-lg-12"></div>);
			return content;
		}

		dateFormatter = (cell/*, row*/) => {
			/* eslint-disable new-cap */
			return cell ? new moment(new Date(cell)).format('DD/MM/YYYY') : '';
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

		render() {
			// ... and renders the wrapped component with the fresh data!
			// Notice that we pass through any additional props

			return (
				<div className="row">
					{this._renderPageTitle()}
					{this._renderDatatable()}
				</div>
			);
		}
	};
}
