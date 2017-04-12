/* © 2017 NauStud.io
 * @author Thanh
 */

import { fork } from 'redux-saga/effects';
import {loginFlow, logoutFlow} from './session';
import {getUserFlow, getUsersFlow, countUserFlow, saveUserFlow, saveUserInListingFlow, getUserRolesFlow} from './user';
import { getRolesFlow } from './role';

export default function* root() {
	// combine your saga here
	yield fork(loginFlow);
	yield fork(logoutFlow);
	yield fork(getUsersFlow);
	yield fork(countUserFlow);
	yield fork(getUserFlow);
	yield fork(saveUserFlow);
	yield fork(saveUserInListingFlow);
	yield fork(getRolesFlow);
	yield fork(getUserRolesFlow);
}
