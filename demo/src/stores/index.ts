import { RootAction, RootState, Services } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { composeEnhancers, services } from '../helpers';
import rootReducer from './reducer';
import rootEpic from './epics';

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
	dependencies: services
});

// configure middlewares
const middlewares = [epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
export * from './todo';
