import React from 'react';
import ClientRegister from './ClientRegister';
import { BusinessRegister } from './BusinessRegister';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
// import './TabViewDemo.css';

export function Register() {
	const auth = useSelector((state) => state.auth);
	console.log('hiiii');
	console.log(auth);
	return (
		<div className="card">
			{/* <h5>Custom Headers</h5> */}
			<TabView className="tabview-custom">
				<TabPanel header="Registrar empresa" leftIcon="pi pi-sitemap">
					<BusinessRegister />
				</TabPanel>
				<TabPanel header="Registrar usuario" rightIcon="pi pi-user">
					<ClientRegister />
				</TabPanel>
			</TabView>
		</div>
	);
}
