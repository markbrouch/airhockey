require("now-env").config();

const micro = require("micro");
const compose = require("micro-compose");
const visualize = require("micro-visualize");
const {handleErrors} = require("micro-boom");
const route = require("micro-route");
const {parse} = require("url");
const next = require("next");

const authHandler = require("./auth");

const {PORT, NODE_ENV} = process.env;

const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== "production";
const app = next({dev});
const appHandler = app.getRequestHandler();

const authRoute = route("/auth(/*)");

const handler = async (req, res) => {
	const parsedUrl = parse(req.url, true);
	const {query} = parsedUrl;

	if (authRoute(req)) {
		return authHandler(req, res);
	}

	return appHandler(req, res, parsedUrl);
};

const handleVisualize = handler => visualize(handler, NODE_ENV);

const server = micro(compose(handleVisualize, handleErrors)(handler));

app.prepare().then(() => {
	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
