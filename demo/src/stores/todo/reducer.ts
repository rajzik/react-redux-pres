import { RootAction } from '../../types/redux';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { ITodo } from '../../types/redux';

export type SandboxState = Readonly<{
	isLoadingTodos: boolean;
	todos: ITodo[];
}>;

export default combineReducers<SandboxState, RootAction>({
	isLoadingTodos: (state = false, action) => {
		switch (action.type) {
			case getType(actions.loadTodosAsync.request):
				return true;

			case getType(actions.loadTodosAsync.success):
			case getType(actions.loadTodosAsync.failure):
				return false;

			default:
				return state;
		}
	},
	todos: (
		state = [
			{
				id: 0,
				title: 'You can add new todos using the form or load saved snapshot...'
			}
		],
		action
	) => {
		switch (action.type) {
			case getType(actions.addTodo):
				return [...state, action.payload];

			case getType(actions.removeTodo):
				return state.filter(i => i.id !== action.payload);

			case getType(actions.loadTodosAsync.success):
				return action.payload;

			default:
				return state;
		}
	}
});
