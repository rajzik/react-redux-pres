import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { todoReducer } from './todo';

const rootReducer = combineReducers({
	router: routerReducer,
	todos: todoReducer
});

export default rootReducer;
