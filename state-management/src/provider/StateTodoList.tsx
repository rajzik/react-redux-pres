import React from 'react';

import { ITodo, Todo } from '../types';
import { TodoList, CreateTodoInput } from '../components';

import * as helper from '../helpers';

interface IProps {
  initialState: {
    todos: ITodo[];
  };
}

interface IState {
  todos: ITodo[];
}

export class StateTodoList extends React.Component<IProps, IState> {
  /* TODO: find out why it may be useful to insert
   * your state Functions inside the state
   * (e.g.: https://reactjs.org/docs/context.html#updating-context-from-a-nested-component)
   */

  constructor(props: IProps) {
    super(props);
    const defaultState: IState = { todos: [] };
    this.state = props.initialState ? props.initialState : defaultState;
  }

  removeTodoItem = (todoId: number) => {
    this.setState(({ todos }: IState) => {
      return {
        todos: helper.remove<ITodo>(todos, todoId),
      };
    });
  };

  createTodoItem = (todoTitle: string) => {
    this.setState(({ todos }: IState) => {
      return {
        todos: helper.create(todos, new Todo(todoTitle)),
      };
    });
  };

  updateTodoItem = (todoId: number, todo: ITodo) => {
    this.setState(({ todos }: IState) => {
      return {
        todos: helper.update(todos, todoId, todo),
      };
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <h1>SetState Todo</h1>
        <CreateTodoInput createTodoItem={this.createTodoItem} />
        <TodoList
          todos={todos}
          removeTodoItem={this.removeTodoItem}
          updateTodoItem={this.updateTodoItem}
        />
      </>
    );
  }
}
