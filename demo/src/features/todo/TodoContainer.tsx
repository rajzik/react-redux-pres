import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { todoActions, todoSelectors } from '../../stores';
import { RootState } from '../../types/redux';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const mapStateToProps = (state: RootState) => ({
	isLoading: state.todos.isLoadingTodos,
	todos: todoSelectors.getTodos(state.todos)
});

const dispatchProps = {
	removeTodo: todoActions.removeTodo,
	addTodo: todoActions.addTodo
};

export type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

function TodoContainer({ isLoading, todos, removeTodo, addTodo }: Props) {
	const [updated, changeUpdated] = useState(1);
	useEffect(() => {
		changeUpdated(updated + 1);
	}, [todos]);

	return (
		<>
			<AddTodo addItem={addTodo} key={updated} />
			<TodoList isLoading={isLoading} todos={todos} removeTodo={removeTodo} />
		</>
	);
}

export default connect(
	mapStateToProps,
	dispatchProps
)(TodoContainer);
