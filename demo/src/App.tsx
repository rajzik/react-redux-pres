import './App.css';

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { Loader, Router, StrictMode } from './components';
import store from './stores';

function App() {
	return (
		<StrictMode>
			<Provider store={store}>
				<Suspense fallback={<Loader />}>
					<Router />
				</Suspense>
			</Provider>
		</StrictMode>
	);
}

export default App;
