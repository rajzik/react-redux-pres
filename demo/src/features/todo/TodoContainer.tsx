import { RootState } from '../../types/redux';
import * as React from 'react';
import { connect } from 'react-redux';

import { todoSelectors, todoActions } from '../../stores';
import TodoComponent from './TodoComponent';

const mapStateToProps = (state: RootState) => ({
	isLoading: state.todos.isLoadingTodos,
	todos: todoSelectors.getTodos(state.todos)
});
const dispatchProps = {
	removeTodo: todoActions.removeTodo
};

export type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

function TodoContainer(props: Props) {
	return <TodoComponent {...props} />;
}

export default connect(
	mapStateToProps,
	dispatchProps
)(TodoContainer);
