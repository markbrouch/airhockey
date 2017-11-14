import Router from "next/router";
import {Grid, Header, Button, Icon} from "semantic-ui-react";

const FACEBOOK_ENDPOINT = process.env.FACEBOOK_ENDPOINT;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI;

const loginFacebook = () => {
	Router.push("/auth/facebook");
};

const LoginForm = () => (
	<div className="login-form">
		<Grid
			container
			textAlign="center"
			verticalAlign="middle"
			style={{height: "100vh"}}
		>
			<Grid.Column>
				<Grid>
					<Grid.Row>
						<Header as="h2" textAlign="center">
							Sign up or Log in with one of your existing accounts
						</Header>
					</Grid.Row>
					<Grid.Row>
						<Button fluid color="facebook" onClick={loginFacebook}>
							<Icon name="facebook" /> Login with Facebook
						</Button>
					</Grid.Row>
					<Grid.Row>
						<Button disabled fluid color="google plus">
							<Icon name="google plus" /> Login with Google
						</Button>
					</Grid.Row>
				</Grid>
			</Grid.Column>
		</Grid>
	</div>
);

export default LoginForm;
