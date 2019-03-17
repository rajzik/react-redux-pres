import { RootAction, RootState, Services } from '../../types/redux';
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map as rxMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { loadTodosAsync, saveTodosAsync } from './actions';
import { getTodos } from './selectors';

export const loadTodosEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, _, { api }) =>
	action$.pipe(
		filter(isActionOf(loadTodosAsync.request)),
		switchMap(() =>
			from(api.todos.loadSnapshot()).pipe(
				rxMap(loadTodosAsync.success),
				catchError((message: string) => of(loadTodosAsync.failure(message)))
			)
		)
	);

export const saveTodosEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
	action$.pipe(
		filter(isActionOf(saveTodosAsync.request)),
		switchMap(() =>
			from(api.todos.saveSnapshot(getTodos(state$.value.todos))).pipe(
				rxMap(saveTodosAsync.success),
				catchError((message: string) => of(saveTodosAsync.failure(message)))
			)
		)
	);
