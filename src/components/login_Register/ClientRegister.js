import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';
import { fetchWithOutToken } from '../../helpers/fetch';
import { startRegisterClient } from '../../action/Register';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/UseForm';
import { Password } from 'primereact/password';

export default function ClientRegister() {
	const dispatch = useDispatch();
	const [countries, setCountries] = useState([]);
	const [provincesUser, setProvincesUser] = useState([]);
	const [citiesUser, setCitiesUser] = useState([]);
	const [documentTypes, setDocumentTypes] = useState([]);
	const [countryUserSelected, setCountryUserSelected] = useState([]);
	const [provinceUserSelected, setProvinceUserSelected] = useState([]);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const getCountries = async () => {
			const resp = await fetchWithOutToken('countries');
			const body = await resp.json();
			const queryDoctypes = await fetchWithOutToken('documenttypes');
			const documentTypes = await queryDoctypes.json();
			setCountries(body);
			setDocumentTypes(documentTypes);
		};
		getCountries();
	}, []);
	const [values, handleInputChange, reset] = useForm({
		phone: '',
		firstName: '',
		lastName: '',
		address: '',
		idDocumentType: '',
		docNumber: '',
		userName: '',
		userPass: '',
		idCountry: '',
		idProvince: '',
		idcity: '',
		e_mail: '',
		userPassConfirme: '',
	});
	const {
		phone,
		firstName,
		lastName,
		address,
		idDocumentType,
		docNumber,
		userName,
		userPass,
		idCountry,
		idProvince,
		idcity,
		e_mail,
		userPassConfirme,
	} = values;

	useEffect(() => {
		const getCountries = async () => {
			const resp = await fetchWithOutToken('countries');
			const body = await resp.json();
			console.log(body);
		};
		getCountries();
	}, []);

	const createClientAccount = (e) => {
		e.preventDefault();
		values.idCountry = countryUserSelected?.id;
		values.idProvince = provinceUserSelected?.id;
		values.idcity = idcity?.id;
		values.idDocumentType = idDocumentType?.id;
		if (validateFormRegister()) {
			dispatch(startRegisterClient(values));
		} else {
			console.log(errors);
		}
	};

	const filterProvinceByIdCountryUser = async (e) => {
		setProvinceUserSelected([]);
		values.idcity = '';
		const idCountry = e.target.value?.id;
		const query = await fetchWithOutToken(`provinces?idCountry=${idCountry}`);
		const provincesCountry = await query.json();
		setProvincesUser(provincesCountry);
		setCountryUserSelected(e.target.value);
	};
	const filterCitiesByIdProvinceUser = async (e) => {
		values.idcity = '';
		const idProvince = e.target.value?.id;
		const query = await fetchWithOutToken(`cities?idProvince=${idProvince}`);
		const cities = await query.json();
		setCitiesUser(cities);
		setProvinceUserSelected(e.target.value);
	};
	const validateFormRegister = () => {
		let errorsForm = [];
		let formOk = true;
		if (!firstName || firstName.lenght === 0) {
			formOk = false;
			errorsForm.firstName = true;
		}
		if (!lastName || lastName.lenght === 0) {
			formOk = false;
			errorsForm.lastName = true;
		}
		if (!idDocumentType) {
			formOk = false;
			errorsForm.idDocumentType = true;
		}
		if (!docNumber) {
			formOk = false;
			errorsForm.docNumber = true;
		}
		if (!userName || userName.lenght < 6 || userName.lenght > 50) {
			formOk = false;
			errorsForm.userName = true;
		}
		if (!userPass || userPass.lenght < 6 || userPass.lenght > 50) {
			formOk = false;
			errorsForm.userPass = true;
		}
		if (!idCountry) {
			formOk = false;
			errorsForm.idCountry = true;
		}
		if (!idProvince) {
			formOk = false;
			errorsForm.idProvince = true;
		}
		if (!idcity) {
			formOk = false;
			errorsForm.idcity = true;
		}
		if (!e_mail) {
			formOk = false;
			errorsForm.e_mail = true;
		}

		if (userPass !== userPassConfirme || !userPassConfirme) {
			formOk = false;
			errorsForm.userPassConfirme = true;
		}

		setErrors(errorsForm);
		return formOk;
	};

	return (
		<div className="business-register">
			<form
				action="#"
				onSubmit={createClientAccount}
				className="business-register-form"
			>
				<div className="responsable-data">
					<h3 className="title-business-section">Datos del responsable</h3>
					<div className="p-grid">
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="firstName"
									className="firstName"
									name="firstName"
									onChange={handleInputChange}
									value={firstName}
								/>
								<label htmlFor="firstName">Nombre</label>
							</span>
							{errors.firstName && (
								<span className="alert">
									<Message severity="error" text="El nombre es obligatorio" />
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="lastName"
									className="lastName"
									name="lastName"
									onChange={handleInputChange}
									value={lastName}
								/>
								<label htmlFor="lastName">Apellido</label>
							</span>
							{errors.lastName && (
								<span className="alert">
									<Message
										severity="error"
										text="El apellido es obligatorio!"
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="address"
									className="address"
									name="address"
									onChange={handleInputChange}
									value={address}
								/>
								<label htmlFor="address">Direccion</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="phone"
									className="phone"
									name="phone"
									onChange={handleInputChange}
									value={phone}
								/>
								<label htmlFor="phone">Telefono</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								// value={idCountry}
								options={documentTypes}
								onChange={handleInputChange}
								optionLabel="name"
								name="idDocumentType"
								filter
								showClear
								filterBy="name"
								placeholder="Seleccionar un tipo de documento"
								valueTemplate={idDocumentType?.name}
							/>
							{errors.idDocumentType && (
								<span className="alert">
									<Message
										severity="error"
										text="El tipo de documento es obligatorio"
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="docNumber"
									className="docNumber"
									name="docNumber"
									onChange={handleInputChange}
								/>
								<label htmlFor="docNumber">Numero Documento</label>
							</span>
							{errors.docNumber && (
								<span className="alert">
									<Message
										severity="error"
										text="El numero de document es obligatorio"
									/>
								</span>
							)}
						</div>

						<div className="input-field col s6 p-col-6">
							<Dropdown
								// value={idCountry}
								options={countries}
								onChange={filterProvinceByIdCountryUser}
								optionLabel="name"
								name="idCountry"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona un pais"
								valueTemplate={countryUserSelected?.name}
							/>
							{errors.idCountry && (
								<span className="alert">
									<Message severity="error" text="Hay que elegir un pais!" />
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={provincesUser}
								onChange={filterCitiesByIdProvinceUser}
								optionLabel="name"
								name="idProvince"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una provincia"
								valueTemplate={provinceUserSelected?.name}
							/>
							{errors.idProvince && (
								<span className="alert">
									<Message
										severity="error"
										text="Hay que elegir una provincia!"
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={citiesUser}
								onChange={handleInputChange}
								optionLabel="name"
								name="idcity"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una localidad"
								valueTemplate={idcity?.name}
							/>
							{errors.idcity && (
								<span className="alert">
									<Message
										severity="error"
										text="Hay que elegir una localidad!"
									/>
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="account-data">
					<h3 className="title-business-section">Datos de la cuenta</h3>
					<div className="p-grid">
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="userName"
									className="userName"
									name="userName"
									onChange={handleInputChange}
									value={userName}
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
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<Password
									value={userPass}
									onChange={handleInputChange}
									toggleMask
									name="userPass"
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
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<Password
									value={userPassConfirme}
									onChange={handleInputChange}
									name="userPassConfirme"
									toggleMask
								/>
								<label htmlFor="userPassConfirme"> Confirmar Contraseña</label>
							</span>
							{errors.userPassConfirme && (
								<span className="alert">
									<Message
										severity="error"
										text="Las contraseñas deben coincidir!"
									/>
								</span>
							)}
						</div>

						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="e_mail"
									className="e_mail"
									name="e_mail"
									onChange={handleInputChange}
									value={e_mail}
								/>
								<label htmlFor="e_mail">Email</label>
							</span>
							{errors.e_mail && (
								<span className="alert">
									<Message
										severity="error"
										text="El email del negocio es obligatorio"
									/>
								</span>
							)}
						</div>
					</div>
				</div>

				<Button
					label="Create Cuenta"
					type="submit"
					id="btn-register"
					className="p-button-raised"
				/>
				<div className="p-d-flex p-jc-around  p-col-12 forget-password-sign-up">
					<div className="forget-password">
						<a href="#">Forget password</a>
					</div>
					<div className="sign-up">
						¿Ya tiene una cueta ?{' '}
						<a href="/login" className="inicia-session">
							Inicia sesion
						</a>
					</div>
				</div>
			</form>
		</div>
	);
}
