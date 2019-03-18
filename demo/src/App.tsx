import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './stores';
import { Router, Loader } from './components';

function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<Loader />}>
				<Router />
			</Suspense>
		</Provider>
	);
}

export default App;
