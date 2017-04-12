import appConfig from '../../config';
import {fetchClient as fetch} from '../fetch.client';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
	localStorage = require('localStorage');
} else {
	// If not, use the browser one
	localStorage = global.window.localStorage;
}

let auth = {
	/**
	* Logs a user in, returning a promise with `true` when done
	* @param  {string} username The username of the user
	* @param  {string} password The password of the user
	* @return {Promise} return a Promise
	*/
	login(username, password) {
		if (auth.loggedIn()) {
			return Promise.resolve(true);
		}
		const url = appConfig.LOGIN_URL;
		const myRequest = new Request(url, {
			method: 'POST',
			body: JSON.stringify({ email: username, password })
		});
		return fetch(myRequest)
			.then((data) => {
				// Save token to local storage
				if (data.header && data.header.status === 200) {
					localStorage.token = data.body.id;
					localStorage.loggedUserId = data.body.userId;
					return Promise.resolve(data);
				} else {
					return Promise.resolve(null);
				}
			})
			.catch(err => {
				console.log('err');
				console.log(err);
				Promise.resolve(null);
			});
	},
	/**
	* Logs the current user out
	* @return {Promise} return a Promise
	*/
	logout() {
		var myRequest = new Request(appConfig.LOGOUT_URL, {
			method: 'POST'
		});
		return fetch(myRequest)
			.then((response) => {
				console.log(response);
				localStorage.removeItem('token');
				localStorage.removeItem('loggedUserId');
			})
			.catch(err => {
				console.log('err');
				console.log(err);
				Promise.resolve(false);
			});
	},

	clearSession() {
		localStorage.removeItem('token');
		localStorage.removeItem('loggedUserId');
	},

	/**
	* Checks if a user is logged in
	* @return {Promise} return a Promise
	*/
	loggedIn() {
		return !!localStorage.token;
	},
	/**
	* Registers a user and then logs them in
	* @param  {string} username The username of the user
	* @param  {string} password The password of the user
	* @return {Promise} return a Promise
	*/
	register(username, password) {
		// Post a fake request
		return fetch('/register', { username, password })
			// Log user in after registering
			.then(() => auth.login(username, password));
	},

	token() {
		return localStorage.token;
	},

	loggedUserId() {
		return localStorage.loggedUserId;
	},

	onChange() { }
};

export default auth;
