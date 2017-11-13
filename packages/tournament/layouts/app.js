import Head from 'next/head'

const App = ({children}) => (
	<div className="app-container">
		<Head>
			<title key="title">Air Hockey Tournament</title>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
				key="viewport"
			/>
			<link
				rel="stylesheet"
				href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
				key="semantic-ui-styles"
			/>
		</Head>
		{children}
	</div>
)

export default App
