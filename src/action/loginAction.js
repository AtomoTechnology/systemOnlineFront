import { Variable_System } from '../helpers/constantes';
import { Decrypt, Encript } from '../helpers/Encript';
import { fetchWithOutToken } from '../helpers/fetch';
import { types } from '../types/types';
import jwt from 'jwt-decode';

export const startLogin = (userName, userPass) => {
	return async (dispatch) => {
		try {
			const query = await fetchWithOutToken(
				'auth',
				{ userName, userPass },
				'POST'
			);
			const result = await query.json();
			if (result.status === 100) {
				localStorage.setItem(Variable_System.token, result.token);
				dispatch(login(manageToken(result.token)));
			}
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};
};

const login = (user) => ({
	type: types.login,
	payload: {
		user,
	},
});

export const startChecking = () => {
	console.log('checking');
	return async (dispatch) => {
		console.log();
		console.log(getToken());
		dispatch(login(manageToken(getToken())));
	};
};

const manageToken = (token) => {
	const decode = jwt(token);
	return decode;
	// console.log(decode);
	// localStorage.setItem(
	// 	Variable_System.idAccount,
	// 	Encript(decode.idAccount.toString())
	// );
	// localStorage.setItem(
	// 	Variable_System.idPrincipal,
	// 	Encript(decode.idPrincipal.toString())
	// );
	// localStorage.setItem(
	// 	Variable_System.idRole,
	// 	Encript(decode.idRole.toString())
	// );
	// localStorage.setItem(Variable_System.typeUser, Encript(decode.typeUser));
	// localStorage.setItem(Variable_System.role, Encript(decode.role));
	// localStorage.setItem(Variable_System.userName, Encript(decode.userName));
	// getIdAccount();
};

// const ClearToken = () => {
// 	localStorage.removeItem(Variable_System.idAccount);
// 	localStorage.removeItem(Variable_System.idPrincipal);
// 	localStorage.removeItem(Variable_System.idRole);
// 	localStorage.removeItem(Variable_System.typeUser);
// 	localStorage.removeItem(Variable_System.role);
// 	localStorage.removeItem(Variable_System.userName);
// 	localStorage.removeItem(Variable_System.token);
// };

// const getIdAccount = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.idAccount));
// };
// const getUserName = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.userName));
// };
// const getIdprincipal = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.idPrincipal));
// };
// const getIdrole = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.idRole));
// };
// const getTypeuser = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.typeUser));
// };

// const getRole = () => {
// 	return Decrypt(localStorage.getItem(Variable_System.role));
// };
const getToken = () => {
	return localStorage.getItem(Variable_System.token);
};
