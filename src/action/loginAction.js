import { fetchWithOutToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (userName, userPass) => {
	return async (dispatch) => {
		const query = await fetchWithOutToken(
			'auth',
			{ userName, userPass },
			'POST'
		);
		const result = await query.json();
		if (result.status === 100) {
			dispatch(login(result));
		}
		console.log(result);
	};
};

const login = (user) => ({
	type: types.login,
	payload: {
		user,
	},
});
