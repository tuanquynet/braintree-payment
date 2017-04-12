import { take, call, put } from 'redux-saga/effects';
import { AppFlowActions } from '../constants';
import { fetchClient as fetch } from '../helpers/fetch.client';
// import { users } from '../mock-data';

/**
 * Effect to handle authorization
 * @param {string} url url to fetch a list of record
 * @return {object} return object
 */
export function* getUsers(url) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		let response = yield call(fetch, url);
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		yield put({ type: AppFlowActions.GET_USERS_COMPLETE, data: response });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

/**
 * read listing data saga
 * @return {array} return array of record
 */
export function* getUsersFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.GET_USERS_REQUEST);
		let {url} = request;

		yield call(getUsers, url);
	}
}

/**
 * Effect to handle authorization
 * @param {string} url url to fetch a list of record
 * @return {object} return object
 */
export function* countUser(url) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		let response = yield call(fetch, url);
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		yield put({ type: AppFlowActions.COUNT_USERS_COMPLETE, data: response });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

/**
 * read listing data saga
 * @return {array} return array of record
 */
export function* countUserFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.COUNT_USERS_REQUEST);
		let {url} = request;

		yield call(countUser, url);
	}
}

/**
 * Effect to handle authorization
 * @param {string} url url to fetch a list of record
 * @return {object} return object
 */
export function* getUser(url) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		let response = yield call(fetch, url);
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		yield put({ type: AppFlowActions.GET_USER_COMPLETE, data: response });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

/**
 * read listing data saga
 * @return {array} return array of record
 */
export function* getUserFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.GET_USER_REQUEST);
		let {url} = request;

		yield call(getUser, url);
	}
}

/**
 * Effect to handle authorization
 * @param {string} url url to fetch a list of record
 * @param {string} data json data
 * @return {object} return object
 */
export function* saveUser(url, data) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		const myRequest = new Request(url, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
		let response = yield call(fetch, myRequest);

		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		yield put({ type: AppFlowActions.SAVE_EDITING_USER_COMPLETE, data: response });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

/**
 * read listing data saga
 * @return {array} return array of record
 */
export function* saveUserFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.SAVE_EDITING_USER_REQUEST);
		let {url, data} = request;

		yield call(saveUser, url, data);
	}
}

export function* saveUserInListing(url, data, refreshOption) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		console.log(url, data);
		const myRequest = new Request(url, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
		let user = yield call(fetch, myRequest);

		yield put({ type: AppFlowActions.SAVE_USER_REQUEST_COMPLETE, data: user });

		let users = yield call(getUsers, refreshOption.url);
		console.log(users);
		return user;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

export function* saveUserInListingFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.SAVE_USER_REQUEST);
		let {url, data, refreshOption} = request;

		yield call(saveUserInListing, url, data, refreshOption);
	}
}


export function* getUserRoles(url) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	try {
		console.log('getUserRoles ', url);
		const myRequest = new Request(url, {
			method: 'GET'
		});
		let roles = yield call(fetch, myRequest);

		yield put({ type: AppFlowActions.GET_EDITING_USER_ROLE_REQUEST_COMPLETE, data: roles });

		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
		return roles;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

export function* getUserRolesFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(AppFlowActions.GET_EDITING_USER_ROLE_REQUEST);
		let {url} = request;
		console.log('getUserRolesFlow ', url);
		yield call(getUserRoles, url);
	}
}
