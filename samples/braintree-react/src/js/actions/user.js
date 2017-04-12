/* © 2017 NauStud.io
 * @author Thanh Tran
 */
import {AppFlowActions} from '../constants';

/**
 * get records
 * @param {string} url endpoint to get list of records
 * @return {void} return nothing
 */
export function getUsers(url) {
	return { type: AppFlowActions.GET_USERS_REQUEST, url: url };
}

export function countUsers(url) {
	return { type: AppFlowActions.COUNT_USERS_REQUEST, url: url };
}

export function getUser(url) {
	return { type: AppFlowActions.GET_USER_REQUEST, url: url };
}

export function saveUser(url, data, refreshOption) {
	return { type: AppFlowActions.SAVE_USER_REQUEST, url, data, refreshOption };
}

// THis action used to update user on local
export function updateEditingUser(data) {
	return { type: AppFlowActions.UPDATE_EDITING_USER, data };
}

// THis action used to save user into database by calling web service
export function saveEditingUser(url, data) {
	return { type: AppFlowActions.SAVE_EDITING_USER_REQUEST, url, data };
}

// THis action used to save user into database by calling web service
export function expireUserSession() {
	return { type: AppFlowActions.EXPIRE_USER};
}

// THis action used to save user into database by calling web service
export function saveUserInListing(url, data, refreshOption) {
	return { type: AppFlowActions.SAVE_USER_REQUEST, url, data, refreshOption};
}

export function getUserRoles(url) {
	return { type: AppFlowActions.GET_EDITING_USER_ROLE_REQUEST, url };
}
