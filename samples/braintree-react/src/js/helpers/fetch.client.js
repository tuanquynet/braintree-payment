import {forEach, result as _result} from 'lodash';
import auth from './auth';
import {expireUserSession} from '../actions';

const defaultHeaders = {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
};

export function fetchClient(url, options = {}) {
	var request;

	if (typeof url === 'string') {
		request = new Request(url, options || {});
	} else {
		request = url;
		forEach(defaultHeaders, (value, key) => {
			if (!(options.headers && options.headers[key])) {
				request.headers.set(key, defaultHeaders[key]);
			}
		});
	}
	// set token
	if (auth.token()) {
		request.headers.set('Authorization', auth.token());
	}

	const handleSessionExpired = (response) => {
		const {error, header} = response;
		let expired = error && error.statusCode === 401;
		expired = expired || (_result(header, 'status') || '').toString() === 401;

		// Check every response if it return 401 error, it will trigger EXPIRE_USER action
		if (expired) {
			auth.clearSession();
			expireUserSession();
		}
	};

	return fetch(request).then((response) => {
		const json = response.json();
		json.then(handleSessionExpired);
		return json;
	});
}
