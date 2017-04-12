/* © 2016 NauStud.io
 * @author Quy Tran
 */

const config = {
	baseUrl: 'https://naustud.io/',
	//token is used for jwt authentication when calling graphql request.
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEyMyIsImlhdCI6MTQ3ODg4NzU2NSwiZXhwIjoxNDc4ODg3NjI1fQ.BIudSXWVVXGdt39j-yRSHpPuMcJoKBXkq9nW7w63-8E',
};
const fetch = require('node-fetch');

export default {
	config,
	fetch
};
