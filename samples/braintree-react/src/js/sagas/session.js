/* © 2017 NauStud.io
 * @author Quy Tran
 */

import { hashHistory } from 'react-router';
import { take, call, put, /*fork,*/ race } from 'redux-saga/effects';
import auth from '../helpers/auth';
import { PageNames, AppFlowActions } from '../constants';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 * @return {void} return nothing
 */
export function* authorize({username, password, isRegistering}) {
	// We send an action that tells Redux we're sending a request
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	// We then try to register or log in the user, depending on the request
	try {
		let response;

		// For either log in or registering, we call the proper function in the `auth`
		// module, which is asynchronous. Because we're using generators, we can work
		// as if it's synchronous because we pause execution until the call is done
		// with `yield`!
		if (isRegistering) {
			response = yield call(auth.register, username, password);
		} else {
			response = yield call(auth.login, username, password);
		}

		return response;
	} catch (error) {
		console.log('hi');
		// If we get an error we send Redux the appropriate action and return
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });

		return false;
	} finally {
		// When done, we tell Redux we're not in the middle of a request any more
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
	}
}

/**
 * Log in saga
 * @return {void} return nothing
 */
export function* loginFlow() {
	const INFINITE = true;
	// Because sagas are generators, doing `while (true)` doesn't block our program
	// Basically here we say "this saga is always listening for actions"
	while (INFINITE) {
		// And we're listening for `AppFlowActions.LOGIN_REQUEST` actions and destructuring its payload
		let request = yield take(AppFlowActions.LOGIN_REQUEST);
		let {username, password} = request.data;

		// A `AppFlowActions.LOGOUT` action may happen while the `authorize` effect is going on, which may
		// lead to a race condition. This is unlikely, but just in case, we call `race` which
		// returns the "winner", i.e. the one that finished first
		let winner = yield race({
			auth: call(authorize, { username, password, isRegistering: false }),
			logout: take(AppFlowActions.LOGOUT)
		});

		// If `authorize` was the winner...
		if (winner.auth) {
			// ...we send Redux appropriate actions
			yield put({ type: AppFlowActions.SET_AUTH, newAuthState: true }); // User is logged in (authorized)
			yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: winner.auth }); // Clear form
			forwardTo(PageNames.DASHBOARD); // Go to dashboard page
			// If `logout` won...
		} else if (winner.logout) {
			// ...we send Redux appropriate action
			yield put({ type: AppFlowActions.SET_AUTH, newAuthState: false }); // User is not logged in (not authorized)
			//yield call(logout); // Call `logout` effect
			forwardTo(PageNames.LOGIN); // Go to root page
		}
	}
}

/**
 * Effect to handle logging out
 * @return {void} return nothing
 */
export function* logout() {
	// We tell Redux we're in the middle of a request
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });

	// Similar to above, we try to log out by calling the `logout` function in the
	// `auth` module. If we get an error, we send an appropiate action. If we don't,
	// we return the response.
	try {
		let response = yield call(auth.logout);
		yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });

		return response;
	} catch (error) {
		yield put({ type: AppFlowActions.REQUEST_ERROR, error: error.message });
	}
}

//Create saga as redux middle will be invoked by redux

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 * @return {void} return nothing
 */
export function* logoutFlow() {
	const INFINITE = true;
	while (INFINITE) {
		yield take(AppFlowActions.LOGOUT);
		yield put({ type: AppFlowActions.SET_AUTH, newAuthState: false });

		yield call(logout);
		forwardTo(PageNames.LOGIN);
	}
}


// Little helper function to abstract going to different pages
function forwardTo(location) {
	hashHistory.push(location);
}
