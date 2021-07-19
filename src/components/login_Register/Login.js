import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { startLogin } from '../../action/loginAction';
import { useForm } from '../../hooks/UseForm';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

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
			<div className="login-form" id="login-form">
				<form onSubmit={loginUser} className="form-login">
					<h3 className="login-title">
						<span
							style={{ fontSize: '1.5rem', marginRight: '10px' }}
							className="pi pi-user"
						></span>
						Login
					</h3>
					<div className="p-grid">
						<div className="input-field col s6 p-col-12">
							<span className="p-float-label">
								<InputText
									id="userName"
									className="userName"
									name="userName"
									onChange={handleInputChange}
									value={userName}
									autoComplete="false"
									// tooltip="nombre de usuario"
								/>
								<label htmlFor="userName">Nombre de Usuario</label>
							</span>
							{errors.userName && (
								<span className="alert">
									<Message
										severity="error"
										text="El nombre de usuario es obligatorio!"
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-12">
							<span className="p-float-label">
								<Password
									value={userPass}
									onChange={handleInputChange}
									toggleMask
									name="userPass"
									autoComplete="false"
								/>

								<label htmlFor="userPass">Contraseña</label>
							</span>
							{errors.userPass && (
								<span className="alert">
									<Message
										severity="error"
										text="La contraseña es obligatoria!"
									/>
								</span>
							)}
						</div>

						<Button
							label="Inicia session"
							type="submit"
							id="btn-login"
							className="p-button-raised"
							// disabled={userName.length < 3 || userPass.length < 3}
						/>
						<div className="p-d-flex p-jc-around  p-col-12 forget-password-sign-up">
							<div className="forget-password">
								<a href="#">Forget password</a>
							</div>
							<div className="sign-up">
								¿No tiene una cueta ?{' '}
								<a href="/register" className="inicia-session">
									Registrarse
								</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
