import AuthReducer from './AuthReducer';
import * as actions from '../actions/AuthenticationAction';

describe('User reducer', () => {
	const DEFAULT_STATE = {
		name: "",
		email: "",
		password: "",
		user: null,
		error: "",
		loading: false,
		loggedin: "",
		firstLogin: false
	};

	it('Successfully adds a user', () => {
		console.log(AuthReducer(DEFAULT_STATE, actions.registerUser({ name: "Leo Messi", email: "leo@barca.com", password: "xxxx" })))
	})
});
