require('dotenv').config();

const invariant = require('invariant');
const {send} = require('micro');
const microAuthFacebook = require('microauth-facebook');
const datastore = require('@google-cloud/datastore')({
	projectId: 'air-hockey-182803'
});

invariant(process.env.FACEBOOK_APP_ID, 'FACEBOOK_APP_ID not found');
invariant(process.env.FACEBOOK_APP_SECRET, 'FACEBOOK_APP_SECRET not found');

const options = {
	appId: process.env.FACEBOOK_APP_ID,
	appSecret: process.env.FACEBOOK_APP_SECRET,
	callbackUrl: 'http://localhost:3000/auth/facebook/callback',
	path: '/auth/facebook',
	fields: 'email,name'
};

const facebookAuth = microAuthFacebook(options);

module.exports = facebookAuth(async (req, res, auth) => {
	if (!auth) {
		return send(res, 404, 'Not Found');
	}

	if (auth.err) {
		console.error(auth.err);
		return send(res, 403, 'Forbidden');
	}

	await datastore.save({
		key: datastore.key('User'),
		data: auth.result.info
	});

	return auth;
});
