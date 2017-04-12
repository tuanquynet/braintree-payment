/* © 2017 NauStud.io
 * @author Thanh Tran
 */
import {AppFlowActions} from '../constants';


export const SET_LANGUAGE = 'SET_LANGUAGE';

/**
 * Set new language for app
 *
 * @export
 * @param {string} language	language code
 * @return {Object} set language action object
 */
export function setLanguage(language) {

	return {
		type: SET_LANGUAGE,
		language,
	};
}


/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 * @return {void} return nothing
 */
export function loginRequest(data) {
	return { type: AppFlowActions.LOGIN_REQUEST, data };
}

/**
 * Log user out
 * @return {void} return nothing
 */
export function logoutRequest() {
	return { type: AppFlowActions.LOGOUT };
}

/**
 * get records
 * @param {string} title endpoint to get list of records
 * @return {void} return nothing
 */
export function changeTitle(title) {
	return { type: AppFlowActions.CHANGE_TITLE, currentPageTitle: title};
}
