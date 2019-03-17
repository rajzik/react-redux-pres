import { createStandardAction, createAsyncAction } from 'typesafe-actions';
import { getRandomNumber } from '../../helpers';
import { ITodo } from '../../types/redux';

export const addTodo = createStandardAction('ADD_TODO').map(
	({ title }: { title: string }): { payload: ITodo } => ({
		payload: {
			title,
			id: getRandomNumber(),
			done: false
		}
	})
);

export const removeTodo = createStandardAction('REMOVE_TODO')<number>();

export const loadTodosAsync = createAsyncAction('LOAD_TODOS_REQUEST', 'LOAD_TODOS_SUCCESS', 'LOAD_TODOS_FAILURE')<
	undefined,
	ITodo[],
	string
>();

export const saveTodosAsync = createAsyncAction('SAVE_TODOS_REQUEST', 'SAVE_TODOS_SUCCESS', 'SAVE_TODOS_FAILURE')<
	undefined,
	undefined,
	string
>();
