import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/UseForm';
// import { fetchWithOutToken } from '../../helpers/fetch';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../action/loginAction';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Login() {
	const dispatch = useDispatch();
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState([]);

	const [values, handleInputChange] = useForm({
		userName: '',
		userPass: '',
	});

	const { userName, userPass } = values;
	const loginUser = async (e) => {
		e.preventDefault();
		console.log(values);
		if (validateLoginForm()) {
			setSubmitting(true);
			dispatch(startLogin(userName, userPass));
		} else {
			console.log(errors);
		}
		setSubmitting(false);
	};
	const validateLoginForm = () => {
		let errores = [];
		let formOk = true;
		if (!userName || userName.length === 0) {
			formOk = false;
			errores.userName = true;
		}
		if (!userPass) {
			formOk = false;
			errores.userPass = true;
		}
		setErrors(errores);

		return formOk;
	};

	return (
		<div className="login">
			<form onSubmit={loginUser} className="login-form" id="login-form">
				<input
					className="form-control"
					onChange={handleInputChange}
					required
					id="usernameOrEmail"
					label="username or email "
					name="userName"
					autoComplete="userName"
					value={userName}
					autoFocus
					type="text"
				/>
				{errors.userName ? (
					<div className="alert alert-error" severity="warning">
						El usuario no es valido!!!
					</div>
				) : (
					''
				)}

				<input
					className="form-control"
					onChange={handleInputChange}
					// required
					fullWidth
					name="userPass"
					label="Password"
					type="password"
					id="userPass"
					value={userPass}
					autoComplete="current-password"
				/>
				{errors.userPass ? (
					<div className="alert alert-error" severity="warning">
						La contreseña no correcta!!!!
					</div>
				) : (
					''
				)}

				<button
					className="btn btn-primary"
					type="submit"
					disabled={userName.length < 3 || userPass.length < 3}
				>
					{submitting ? 'espere...' : 'Sign In'}
				</button>
				{/* <Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link to="/register" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid> */}
			</form>
		</div>
	);
}
