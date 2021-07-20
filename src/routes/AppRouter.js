import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { startChecking, startLogin } from '../action/loginAction';
import { Home } from '../components/Home';
import { Login } from '../components/login_Register/Login';
import { Register } from '../components/login_Register/Register';
// import { Main } from '../components/menu/Main';
// import { SubMain } from '../components/menu/SubMain';

export default function AppRouter() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(startChecking());
	}, []);
	return (
		<Router>
			<div>
				{/* <Main /> */}
				{/* <SubMain /> */}

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route eaxact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
}
