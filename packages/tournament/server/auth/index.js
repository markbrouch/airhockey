const rp = require('request-promise')
const compose = require('micro-compose')
const {createError} = require('micro-boom')

const facebookHandler = require('./facebook')

const handler = async (req, res, auth) => {
	if (!auth) {
		throw createError(404, 'Not found', {
			reason: 'No auth data'
		})
	}

	if (auth.err) {
		throw createError(auth.err.statusCode, auth.err.name, auth.err.error)
	}

	if (auth.result.provider === 'facebook') {
		console.log(
			await rp({
				method: 'GET',
				url: `https://graph.facebook.com/v2.11/me/permissions?access_token=${auth
					.result.accessToken}&debug=all`,
				json: true
			})
		)
		const info = await rp({
			method: 'GET',
			url: `https://graph.facebook.com/v2.11/me?access_token=${auth.result
				.accessToken}&fields=email`,
			json: true
		}).catch(err => {
			throw createError(err.statusCode, err.name, err.error)
		})

		console.log(info)
	}

	return auth
}

module.exports = compose(facebookHandler)(handler)
