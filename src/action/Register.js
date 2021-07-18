import { fetchWithOutToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startRegisterClient = (formValues) => {
	console.log('12');
	return async (dispatch) => {
		console.log(formValues);

		console.log('123');
		const query = await fetchWithOutToken('users', formValues, 'POST');
		const result = await query.json();
		// if(result.)
		console.log(result);
		dispatch(registerClient(formValues));
	};
};

const registerClient = (client) => {
	return {
		type: types.registerClient,
		payload: {
			client,
		},
	};
};

export const startRegisterBusiness = (formValues) => {
	return async (dispatch) => {
		try {
			console.log(formValues);
			const query = await fetchWithOutToken('businesses', formValues, 'POST');
			const result = await query.json();
			// if(result.)
			console.log(result);
			// dispatch(registerClient(formValues));
		} catch (error) {
			console.log(error);
		}
	};
};

const registerBusiness = (business) => {
	return {
		type: types.registerBusiness,
		payload: {
			business,
		},
	};
};
