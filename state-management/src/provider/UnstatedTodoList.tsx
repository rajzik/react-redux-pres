import React from 'react';
import { Container, Provider, Subscribe } from 'unstated';

import { CreateTodoInput, TodoList } from '../components';
import * as helper from '../helpers';
import { ITodo, Todo, IGeneralProps } from '../types';

export const mountUnstated = (Container: any) => (initialState: any, Component: any) => {
  const container = new Container({
    initialState: initialState ? initialState : null,
  });
  return (
    <Provider inject={[container]}>
      <Component />
    </Provider>
  );
};

interface ITodos {
  todos: ITodo[];
}

export class TodoListContainer extends Container<ITodos> {
  state: ITodos;
  constructor(props: any) {
    super();

    const defaultState = { todos: [] };
    this.state = props.initialState ? props.initialState : defaultState;
  }

  removeTodoItem = (todoId: number) => {
    this.setState((state: ITodos) => {
      return {
        todos: helper.remove(state.todos, todoId),
      };
    });
  };

  createTodoItem = (todoTitle: string) => {
    this.setState((state: ITodos) => {
      return {
        todos: helper.create(state.todos, new Todo(todoTitle)),
      };
    });
  };

  updateTodoItem = (todoId: number, todo: ITodo) => {
    this.setState((state: ITodos) => {
      return {
        todos: helper.update(state.todos, todoId, todo),
      };
    });
  };
}

export const UnstatedTodoList = () => (
  <Subscribe to={[TodoListContainer]}>
    {(list: any) => (
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
