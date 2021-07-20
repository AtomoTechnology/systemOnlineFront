import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
	const auth = useSelector((state) => state.auth);
	console.log('hiiii');
	console.log(auth);
	return <div>Home</div>;
};
