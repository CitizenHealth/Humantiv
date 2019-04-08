import * as actions from './AuthenticationAction';

describe('nameChanged returns action', () => {
	it('returns an action', () => {
		expect(actions.nameChanged('Leo Messi')).toMatchSnapshot();
	});

	it('returns an actions if passed a null', () => {
		expect(actions.nameChanged(null)).toMatchSnapshot();
	});

	it('returns an actions if passed an empty object', () => {
		expect(actions.nameChanged('')).toMatchSnapshot();
	});
});

describe('emailChanged returns action', () => {
	it('returns an action', () => {
		expect(actions.emailChanged('leo.messi@barca.com')).toMatchSnapshot();
	});

	it('returns an actions if passed a null', () => {
		expect(actions.emailChanged(null)).toMatchSnapshot();
	});

	it('returns an actions if passed an empty object', () => {
		expect(actions.emailChanged('')).toMatchSnapshot();
	});
});

describe('passwordChanged returns action', () => {
	it('returns an action', () => {
		expect(actions.passwordChanged('leo.messi@barca.com')).toMatchSnapshot();
	});

	it('returns an actions if passed a null', () => {
		expect(actions.passwordChanged(null)).toMatchSnapshot();
	});

	it('returns an actions if passed an empty object', () => {
		expect(actions.passwordChanged('')).toMatchSnapshot();
	});
});


describe('registerUser returns action', () => {
	it('dispatches register succeeded', async () => {
		const mockDispatch = jest.fn();
		await actions.registerUser({ name: 'Leo Messi', email: 'leo.messi@barca.com', password: 'Iamth3k1n9' })(mockDispatch);
		expect(mockDispatch.mock.calls[0][0]).toMatchSnapshot();
	});
})