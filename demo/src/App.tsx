import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './stores';
import { Main } from './pages';

function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

export default App;
