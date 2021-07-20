import React from 'react';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import Dashboard from './routes/Dashboard';

function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App;
