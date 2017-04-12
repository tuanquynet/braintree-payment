/* © 2016 NauStud.io
 * @author Quy Tran
 * This is example of how to test RESTFul api
 */
import initialized from './init.js';

const {config, fetch} = initialized;

describe('Simple test', function() {

	// The promise that is being tested should be returned or pass in done callback
	it('Fetch a url', (done) => {
		const url = config.baseUrl;
		fetch(url, { method: 'GET'})
			.then(function (response) {
				expect(response.status).toBe(200);
				done();
			})
			.catch(function (error) {
				throw error;
			});
	});

});
