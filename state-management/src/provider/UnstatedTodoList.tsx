import React from 'react';
import { Container, Provider, Subscribe } from 'unstated';

import { CreateTodoInput, TodoList } from '../components';
import * as helper from '../helpers';
import { ITodo, Todo } from '../types';

export const mountUnstated = Container => (initialState, Component: component) => {
  const container = new Container({
    initialState: initialState ? initialState : null,
  });
  return (
    <Provider inject={[container]}>
      <Component />
    </Provider>
  );
};

export class TodoListContainer extends Container {
  constructor(props) {
    super(props);

    const defaultState = { todos: [] };
    this.state = props.initialState ? props.initialState : defaultState;
  }

  removeTodoItem = (todoId: number) => {
    this.setState(state => {
      return {
        todos: helper.remove(state.todos, todoId),
      };
    });
  };

  createTodoItem = (todoTitle: string) => {
    this.setState(state => {
      return {
        todos: helper.create(state.todos, new Todo(todoTitle)),
      };
    });
  };

  updateTodoItem = (todoId: number, todo: ITodo) => {
    this.setState(state => {
      return {
        todos: helper.update(state.todos, todoId, todo),
      };
    });
  };
}

export const UnstatedTodoList = () => (
  <Subscribe to={[TodoListContainer]}>
    {list => (
      <>
        <h1>Unstated Todo </h1>
        {/* the two consumer seem useless here, but imagine them somewhere nested in our UI */}
        <CreateTodoInput createTodoItem={list.createTodoItem} />
        <TodoList
          todos={list.state.todos}
          removeTodoItem={list.removeTodoItem}
          updateTodoItem={list.updateTodoItem}
        />
      </>
    )}
  </Subscribe>
);
