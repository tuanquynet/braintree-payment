/* © 2017 NauStud.io
 * @author Thanh Tran
 */
import { AppFlowActions } from '../constants';

/**
 * get records
 * @param {string} url endpoint to get list of records
 * @return {void} return nothing
 */
export function getRoles(url) {
	return { type: AppFlowActions.GET_ROLES_REQUEST, url: url };
}
