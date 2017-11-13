import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch
}

const createApolloClient = initialState =>
	new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link: new HttpLink({
			uri: 'https://api.graph.cool/simple/v1/cj9uwpg8wepgl0174mivald1h', // Server URL (must be absolute)
			opts: {
				credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
			}
		}),
		cache: new InMemoryCache().restore(initialState || {})
	})

export default function initApollo(initialState) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return createApolloClient(initialState)
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = createApolloClient(initialState)
	}

	return apolloClient
}
