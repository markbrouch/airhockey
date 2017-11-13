import {Button} from 'semantic-ui-react'

import buttonStyle from 'semantic-ui-css/components/button.css'

export default () => (
	<div>
		<Button primary>Test</Button>
		<style jsx global>
			{buttonStyle}
		</style>
	</div>
)
