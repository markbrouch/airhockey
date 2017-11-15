const microAuthFacebook = require('microauth-facebook')

const {
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET,
	FACEBOOK_REDIRECT_URI
} = process.env

const options = {
	appId: FACEBOOK_APP_ID,
	appSecret: FACEBOOK_APP_SECRET,
	callbackUrl: FACEBOOK_REDIRECT_URI,
	path: '/auth/facebook'
}

const handler = microAuthFacebook(options)

module.exports = handler
