import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { useForm } from '../../hooks/UseForm';
import { fetchWithOutToken } from '../../helpers/fetch';
import { useDispatch } from 'react-redux';
import { startRegisterBusiness } from '../../action/Register';
export const BusinessRegister = () => {
	const [countries, setCountries] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [documentTypes, setDocumentTypes] = useState([]);

	useEffect(() => {
		const getCountries = async () => {
			const resp = await fetchWithOutToken('countries');
			const body = await resp.json();
			const resp1 = await fetchWithOutToken('provinces?idCountry=1');
			const body1 = await resp1.json();
			const resp2 = await fetchWithOutToken('cities?idProvince=5');
			const body2 = await resp2.json();
			const queryDoctypes = await fetchWithOutToken('documenttypes');
			const documentTypes = await queryDoctypes.json();
			setCountries(body);
			setProvinces(body1);
			setCities(body2);
			setDocumentTypes(documentTypes);

			console.log(body);
			console.log(body1);
			console.log(cities);
		};
		getCountries();
	}, []);
	const [result, setResult] = useState('');
	const [logoName, setLogoName] = useState('');
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
		e_mailaccount,
	} = values;

	const createBusinessAccount = (e) => {
		e.preventDefault();
		values.idCountry = idCountry?.id;
		values.idProvince = idProvince?.id;
		values.idcity = idcity?.id;
		values.idCountryuser = idCountryuser?.id;
		values.idProvinceuser = idProvinceuser?.id;
		values.idcityuser = idcityuser?.id;
		values.idDocumentType = idDocumentType?.id;

		dispatch(startRegisterBusiness(values));

		// console.log(values);
		// console.log(values);
		// console.log(result);
	};

	const PreviewLogo = (e) => {
		console.log(e.target);
		if (e.target.files) {
			console.log(e.target.files);
			setLogoName(e.target.files[0].name);
			var reader = new FileReader();

			reader.onload = function (e) {
				let img = e.target.result;
				values.logo = img;
				document.querySelector('.logoBusiness').setAttribute('src', img);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
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
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="businessName"
									className="businessName"
									name="businessName"
									onChange={handleInputChange}
								/>
								<label htmlFor="businessName">Razon Social</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="cuit_cuil"
									className="cuit_cuil"
									name="cuit_cuil"
									onChange={handleInputChange}
								/>
								<label htmlFor="cuit_cuil">Cuit</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="address"
									className="address"
									onChange={handleInputChange}
									name="address"
								/>
								<label htmlFor="address">Direccion</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="e_mail"
									className="e_mail"
									name="e_mail"
								/>
								<label htmlFor="e_mail">E_mail</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="postal_code"
									className="postal_code"
									name="postal_code"
								/>
								<label htmlFor="postal_code">Codigo Postgal </label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									onChange={handleInputChange}
									id="phoneBusiness"
									className="phoneBusiness"
									name="phoneBusiness"
								/>
								<label htmlFor="phoneBusiness">phoneBusiness,</label>
							</span>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								// value={idCountry}
								options={countries}
								onChange={handleInputChange}
								optionLabel="name"
								name="idCountry"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona un pais"
								valueTemplate={idCountry?.name}
							/>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={provinces}
								onChange={handleInputChange}
								optionLabel="name"
								name="idProvince"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una provincia"
								valueTemplate={idProvince?.name}
							/>
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
								placeholder="Selecciona una provincia"
								valueTemplate={idcity?.name}
							/>
						</div>
						<div className="input-field col s6 p-col-6">
							<input
								hidden
								type="file"
								name="logo"
								onChange={PreviewLogo}
								id="logo"
								accept="image/*"
								maxFileSize={3000000}
								// chooseLabel="Seleccionar el logo"
								// upload={PreviewLogo}
							/>
							<label className="select-file" htmlFor="logo">
								Seleccionar el logo
							</label>
							{/* <div className="preview"> */}
							<img alt="" width="100" height="100" className="logoBusiness" />
							{/* <span>{logoName}</span> */}
							{/* </div> */}
						</div>
					</div>
				</div>
				<div className="responsable-data">
					<h3 className="title-business-section">Datos del responsable</h3>
					<div className="p-grid">
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="firstName"
									className="firstName"
									name="firstName"
									onChange={handleInputChange}
								/>
								<label htmlFor="firstName">Nombre</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="lastName"
									className="lastName"
									name="lastName"
									onChange={handleInputChange}
								/>
								<label htmlFor="lastName">Apellido</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="addressuser"
									className="addressuser"
									name="addressuser"
									onChange={handleInputChange}
								/>
								<label htmlFor="addressuser">Direccion</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="phoneuser"
									className="phoneuser"
									name="phoneuser"
									onChange={handleInputChange}
								/>
								<label htmlFor="phoneuser">Telefono</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
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
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="docNumber"
									className="docNumber"
									name="docNumber"
									onChange={handleInputChange}
								/>
								<label htmlFor="docNumber">Numero Documento</label>
							</span>
						</div>

						<div className="input-field col s6 p-col-6">
							<Dropdown
								// value={idCountry}
								options={countries}
								onChange={handleInputChange}
								optionLabel="name"
								name="idCountryuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona un pais"
								valueTemplate={idCountryuser?.name}
							/>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={provinces}
								onChange={handleInputChange}
								optionLabel="name"
								name="idProvinceuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una provincia"
								valueTemplate={idProvinceuser?.name}
							/>
						</div>
						<div className="input-field col s6 p-col-6">
							<Dropdown
								options={cities}
								onChange={handleInputChange}
								optionLabel="name"
								name="idcityuser"
								filter
								showClear
								filterBy="name"
								placeholder="Selecciona una cuidad"
								valueTemplate={idcityuser?.name}
							/>
						</div>
					</div>
				</div>

				<div className="account-data">
					<h3 className="title-business-section">Datos de la cuenta</h3>
					<div className="p-grid">
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="userName"
									className="userName"
									name="userName"
									onChange={handleInputChange}
								/>
								<label htmlFor="userName">Nombre de Usuario</label>
							</span>
						</div>
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="userPass"
									className="userPass"
									name="userPass"
									onChange={handleInputChange}
								/>
								<label htmlFor="userPass">Contraseña</label>
							</span>
						</div>
						{/* <div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="userPassConfirme"
									className="userPassConfirme"
									name="userPassConfirme"
									onChange={handleInputChange}
								/>
								<label htmlFor="userPassConfirme"> Confirmar Contraseña</label>
							</span>
						</div> */}
						<div class="input-field col s6 p-col-6">
							<span className="p-float-label">
								<InputText
									id="e_mailaccount"
									className="e_mailaccount"
									name="e_mailaccount"
									onChange={handleInputChange}
								/>
								<label htmlFor="e_mailaccount">Email de la cuenta</label>
							</span>
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
