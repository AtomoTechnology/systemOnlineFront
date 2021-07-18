import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { fetchWithOutToken } from '../../helpers/fetch';
import { startRegisterClient } from '../../action/Register';
import { useDispatch } from 'react-redux';
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function ClientRegister() {
	const dispatch = useDispatch();

	let data = {
		phone: '3417208882',
		firstName: 'Hilaire',
		lastName: 'Jean',
		address: 'Sarmiento',
		typeDocument: 'dni',
		docNumber: '95898862',
		idRole: 1,
		userName: 'Pradel',
		userPass: '123abc',
		idCountry: 1,
		idProvince: 1,
		idcity: 1,
	};
	console.log();
	//get countries

	useEffect(() => {
		const getCountries = async () => {
			const resp = await fetchWithOutToken('countries');
			const body = await resp.json();
			console.log(body);
		};
		getCountries();
	}, []);

	const createClient = (e) => {
		e.preventDefault();
		let i = 1;
		if (i === 1) {
			console.log('im');
			dispatch(startRegisterClient(data));
		}
		// const resp = await fetch('http://localhost:5000/api/users',{
		//   method : 'POST',
		//   headers: {
		//     'Content-Type': 'application/json'
		//     // 'Content-Type': 'application/x-www-form-urlencoded',
		//   },
		//   body : JSON.stringify(data)
		// }) ;
		// console.log('1');
		// console.log(resp);
		// const body = await resp.json();
		// console.log(body);
		// console.log('2');
		// fetch(url, {
		//   method,
		//   headers: {
		//     "content-type": "application/json",
		//     "x-token": token,
		//   },
		//   body: JSON.stringify(data),
		// });
	};
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up Client
				</Typography>
				<form onSubmit={createClient} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up Client
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
