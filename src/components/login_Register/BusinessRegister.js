import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { useForm } from '../../hooks/UseForm';
import { fetchWithOutToken } from '../../helpers/fetch';
import { useDispatch } from 'react-redux';
import { startRegisterBusiness } from '../../action/Register';
export const BusinessRegister = () => {
	const [errors, setErrors] = useState([]);
	const [countries, setCountries] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [documentTypes, setDocumentTypes] = useState([]);
	const [countrySelected, setCountrySelected] = useState([]);
	const [provinceSelected, setProvinceSelected] = useState([]);

	const [provincesUser, setProvincesUser] = useState([]);
	const [citiesUser, setCitiesUser] = useState([]);

	const [countryUserSelected, setCountryUserSelected] = useState([]);
	const [provinceUserSelected, setProvinceUserSelected] = useState([]);

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
	const [result, setResult] = useState('');
	const [logoName, setLogoName] = useState('');
	const [sizeLogo, setSizeLogo] = useState('');
	const dispatch = useDispatch();

	const [values, handleInputChange, reset] = useForm({
		businessName: '',
		firstName: '',
		lastName: '',
		address: '',
		addressuser: '',
		idDocumentType: '',
		docNumber: '',
		logo: '',
		userPass: '',
		idCountry: '',
		idProvince: '',
		idcity: '',
		phoneBusiness: '',
		phoneuser: '',
		idRole: '',
		idCountryuser: '',
		idProvinceuser: '',
		idcityuser: '',
		userName: '',
		postal_code: '',
		e_mail: '',
		cuit_cuil: '',
		e_mailaccount: '',
		userPassConfirme: '',
	});

	const {
		businessName,
		firstName,
		lastName,
		address,
		addressuser,
		idDocumentType,
		docNumber,
		logo,
		userPass,
		idCountry,
		idProvince,
		idcity,
		phoneBusiness,
		phoneuser,
		idRole,
		idCountryuser,
		idProvinceuser,
		idcityuser,
		userName,
		postal_code,
		e_mail,
		cuit_cuil,
		userPassConfirme,
		e_mailaccount,
	} = values;

	const createBusinessAccount = (e) => {
		e.preventDefault();
		values.idCountry = countrySelected?.id;
		values.idProvince = provinceSelected?.id;
		values.idcity = idcity?.id;
		values.idCountryuser = countryUserSelected?.id;
		values.idProvinceuser = provinceUserSelected?.id;
		values.idcityuser = idcityuser?.id;
		values.idDocumentType = idDocumentType?.id;
		if (validateFormRegister()) {
			dispatch(startRegisterBusiness(values));
		} else {
			console.log(errors);
		}
	};

	const PreviewLogo = (e) => {
		console.log(e.target);
		if (e.target.files) {
			console.log(e.target.files);
			setLogoName(e.target.files[0].name);
			let size = (e.target.files[0].size / 1024).toFixed(2);
			setSizeLogo(size);
			var reader = new FileReader();
			reader.onload = function (e) {
				let img = e.target.result;
				values.logo = img;
				document.querySelector('.logoBusiness').setAttribute('src', img);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	const filterProvinceByIdCountry = async (e) => {
		setProvinceSelected([]);
		values.idcity = '';
		const idCountry = e.target.value?.id;
		const query = await fetchWithOutToken(`provinces?idCountry=${idCountry}`);
		const provincesCountry = await query.json();
		setCountrySelected(e.target.value);
		setProvinces(provincesCountry);
		console.log(countrySelected);
	};

	const filterCitiesByIdProvince = async (e) => {
		values.idcity = '';
		const idProvince = e.target.value?.id;
		const query = await fetchWithOutToken(`cities?idProvince=${idProvince}`);
		const cities = await query.json();
		setCities(cities);
		setProvinceSelected(e.target.value);
		console.log(provinceSelected);
	};
	const filterProvinceByIdCountryUser = async (e) => {
		setProvinceUserSelected([]);
		values.idcityuser = '';
		const idCountry = e.target.value?.id;
		const query = await fetchWithOutToken(`provinces?idCountry=${idCountry}`);
		const provincesCountry = await query.json();
		setProvincesUser(provincesCountry);
		setCountryUserSelected(e.target.value);
	};
	const filterCitiesByIdProvinceUser = async (e) => {
		values.idcityuser = '';
		const idProvince = e.target.value?.id;
		const query = await fetchWithOutToken(`cities?idProvince=${idProvince}`);
		const cities = await query.json();
		setCitiesUser(cities);
		setProvinceUserSelected(e.target.value);
	};

	const validateFormRegister = () => {
		let errorsForm = [];
		let formOk = true;
		if (!businessName || businessName.lenght === 0) {
			formOk = false;
			errorsForm.businessName = true;
		}
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
		if (!idCountryuser) {
			formOk = false;
			errorsForm.idCountryuser = true;
		}
		if (!idProvinceuser) {
			formOk = false;
			errorsForm.idProvinceuser = true;
		}
		if (!idcityuser) {
			formOk = false;
			errorsForm.idcityuser = true;
		}
		if (!postal_code) {
			formOk = false;
			errorsForm.postal_code = true;
		}
		if (!e_mail) {
			formOk = false;
			errorsForm.e_mail = true;
		}
		if (!e_mailaccount) {
			formOk = false;
			errorsForm.e_mailaccount = true;
		}
		if (!cuit_cuil) {
			formOk = false;
			errorsForm.cuit_cuil = true;
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
				onSubmit={createBusinessAccount}
				className="business-register-form"
			>
				<div className="business-data">
					<h3 className="title-business-section">Datos del negocio</h3>

					<div className="p-grid">
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="businessName"
									className="businessName"
									name="businessName"
									onChange={handleInputChange}
									value={businessName}
								/>
								<label htmlFor="businessName">Razon Social</label>
							</span>

							{errors.businessName && (
								<span className="alert">
									<Message
										severity="error"
										text="la razon social es obligatorio "
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="cuit_cuil"
									className="cuit_cuil"
									name="cuit_cuil"
									onChange={handleInputChange}
									value={cuit_cuil}
								/>
								<label htmlFor="cuit_cuil">Cuit</label>
							</span>
							{errors.cuit_cuil && (
								<span className="alert">
									<Message severity="error" text="El cuit es obligatorio!" />
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="address"
									className="address"
									onChange={handleInputChange}
									name="address"
									value={address}
								/>
								<label htmlFor="address">Direccion</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="e_mail"
									className="e_mail"
									name="e_mail"
									value={e_mail}
								/>
								<label htmlFor="e_mail">E_mail</label>
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
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="postal_code"
									className="postal_code"
									name="postal_code"
									value={postal_code}
								/>
								<label htmlFor="postal_code">Codigo Postgal </label>
							</span>
							{errors.postal_code && (
								<span className="alert">
									<Message
										severity="error"
										text="El codigo postal es obligatorio"
									/>
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="phoneBusiness"
									className="phoneBusiness"
									name="phoneBusiness"
									value={phoneBusiness}
									onSelect
								/>
								<label htmlFor="phoneBusiness">phoneBusiness,</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								// value={countrySelected}
								options={countries}
								onChange={filterProvinceByIdCountry}
								// onFocus={filterProvinceByIdCountry}
								optionLabel="name"
								name="idCountry"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona un pais"
								valueTemplate={countrySelected?.name}
							/>
							{errors.idCountry && (
								<span className="alert">
									<Message severity="error" text="Hay que elegir un pais!" />
								</span>
							)}
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={provinces}
								onChange={filterCitiesByIdProvince}
								optionLabel="name"
								name="idProvince"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una provincia"
								valueTemplate={provinceSelected?.name}
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
								options={cities}
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
						<div className="input-field col s6 p-col-6 " id="box-logo-business">
							<input
								hidden
								type="file"
								namNamee="logo"
								onChange={PreviewLogo}
								id="logo"
								accept="image/*"
								maxFileSize={3000000}
								// chooseLabel="Seleccionar el logo"
								// upload={PreviewLogo}
							/>
							<label
								className="select-file p-d-flex p-jc-around p-ai-center"
								id="lb-logo-business"
								htmlFor="logo"
							>
								<i
									className="pi  pi-images"
									style={{ fontSize: '1.5em', marginRight: '10px' }}
								></i>
								<span>Seleccionar el logo</span>
							</label>
						</div>
						{logoName ? (
							<div className="preview">
								<img alt="" width="100" height="100" className="logoBusiness" />
								<span>{logoName}</span>
								<span className="size-logo">{sizeLogo + ' Kbs'}</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>
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
									id="addressuser"
									className="addressuser"
									name="addressuser"
									onChange={handleInputChange}
									value={addressuser}
								/>
								<label htmlFor="addressuser">Direccion</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="phoneuser"
									className="phoneuser"
									name="phoneuser"
									onChange={handleInputChange}
									value={phoneuser}
								/>
								<label htmlFor="phoneuser">Telefono</label>
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
								name="idCountryuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona un pais"
								valueTemplate={countryUserSelected?.name}
							/>
							{errors.idCountryuser && (
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
								name="idProvinceuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una provincia"
								valueTemplate={provinceUserSelected?.name}
							/>
							{errors.idProvinceuser && (
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
								name="idcityuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una localidad"
								valueTemplate={idcityuser?.name}
							/>
							{errors.idcityuser && (
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
									id="e_mailaccount"
									className="e_mailaccount"
									name="e_mailaccount"
									onChange={handleInputChange}
									value={e_mailaccount}
								/>
								<label htmlFor="e_mailaccount">Email de la cuenta</label>
							</span>
							{errors.e_mailaccount && (
								<span className="alert">
									<Message
										severity="error"
										text="El email de la cuenta es obligatorio!"
									/>
								</span>
							)}
						</div>
					</div>
				</div>

				<Button
					label="Registrar Negocio"
					type="submit"
					id="btn-register"
					className="p-button-raised"
				/>
			</form>
		</div>
	);
};
