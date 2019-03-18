import { ITodo } from '../../types/redux';
import React from 'react';

import TodoItem from './TodoItem';
import { curryFunction } from '../../helpers';

interface IProps {
	isLoading: boolean;
	todos: ITodo[];
	removeTodo: (id: number) => void;
}

export default function TodoList({ isLoading, todos = [], removeTodo }: IProps) {
	if (isLoading) {
		return <p>Loading...</p>;
	}

	function mapTodo({ id, title }: ITodo) {
		return <TodoItem key={id} title={title} onRemove={curryFunction(removeTodo, id)} />;
	}

	return <ul>{todos.map(mapTodo)}</ul>;
}
