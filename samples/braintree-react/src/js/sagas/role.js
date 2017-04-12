import { take, call, put } from 'redux-saga/effects';
import { AppFlowActions } from '../constants';
import { fetchClient as fetch } from '../helpers/fetch.client';
// import { users } from '../mock-data';

/**
 * Effect to handle authorization
 * @param {string} url url to fetch a list of record
 * @return {object} return object
 */
export function* getRoles(url) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		let response = yield call(fetch, url);
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		yield put({ type: AppFlowActions.GET_ROLES_REQUEST_COMPLETE, data: response });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

/**
 * read listing data saga
 * @return {array} return array of record
 */
export function* getRolesFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.GET_ROLES_REQUEST);
		let { url } = request;

		yield call(getRoles, url);
	}
}
