require('now-env').config()

const micro = require('micro')
const match = require('micro-route/match')
const {parse} = require('url')
const next = require('next')

const {PORT, NODE_ENV} = process.env

const port = parseInt(PORT, 10) || 3000
const dev = NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const server = micro(async (req, res) => {
	const parsedUrl = parse(req.url, true)
	const {query} = parsedUrl

	return handle(req, res, parsedUrl)
})

app.prepare().then(() => {
	server.listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
