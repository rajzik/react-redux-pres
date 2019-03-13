import React from 'react';

import { createStore, Dispatch } from 'redux';
import { connect, Provider } from 'react-redux';
import { mainReducer as reducer, IMainReducer } from './reducers';
import * as TodoActions from './actions';

import { TodoList, CreateTodoInput } from '../../components';

import { devToolsEnhancer } from 'redux-devtools-extension';
import { IGeneralProps, IGeneralState, ITodo } from '../../types';

interface IContextShape {
  todos: ITodo[];
  createTodoItem: (title: string) => void;
  updateTodoItem: (id: number, todo: ITodo) => void;
  removeTodoItem: (id: number) => void;
  title: string;
}

export const mountWithRedux = ({ initialState, Component }: any) => {
  const store = createStore(reducer, initialState ? initialState : {}, devToolsEnhancer({}));
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export class ReduxTodoList extends React.Component<IContextShape> {
  render() {
    const { todos, createTodoItem, updateTodoItem, removeTodoItem, title } = this.props;
    return (
      <React.Fragment>
        <h1>{title ? title : 'Redux List'}</h1>
        <CreateTodoInput createTodoItem={createTodoItem} />
        <TodoList todos={todos} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IMainReducer) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTodoItem: (title: string) => {
    dispatch(TodoActions.createTodoItem(title));
  },
  updateTodoItem: (todoId: number, todo: ITodo) => {
    dispatch(TodoActions.updateTodoItem(todoId, todo));
  },
  removeTodoItem: (todoId: number) => {
    dispatch(TodoActions.removeTodoItem(todoId));
  },
});

export const ConnectedReduxTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTodoList);
