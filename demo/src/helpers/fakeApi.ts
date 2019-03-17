import { ITodo } from '../types/redux';

let todos: ITodo[] = [{ id: 0, title: `Yo, your snapshot has been loaded successfully!` }];

export function loadSnapshot(): Promise<ITodo[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(todos);
		}, 500);
	});
}

export function saveSnapshot(data: ITodo[]): Promise<undefined> {
	return new Promise(resolve => {
		setTimeout(() => {
			todos = data;
			resolve();
		}, 500);
	});
}
