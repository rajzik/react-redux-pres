import React from 'react';

import { ITodo, Todo, IGeneralProps, IGeneralState } from '../types';
import { TodoList, CreateTodoInput } from '../components';

import * as helper from '../helpers';

interface IContextShape {
  state: IGeneralState;
  actions: {
    removeTodoItem: (todoId: number) => void;
    createTodoItem: (todoTitle: string) => void;
    updateTodoItem: (todoId: number, todo: ITodo) => void;
  };
}

const Context = React.createContext<IContextShape>({
  state: {
    todos: [],
  },
  actions: {
    createTodoItem: () => {},
    removeTodoItem: () => {},
    updateTodoItem: () => {},
  },
});

export class ContextTodoList extends React.Component<IGeneralProps, IGeneralState> {
  static Consumer = Context.Consumer;
  static Provider = Context.Provider;

  constructor(props: IGeneralProps) {
    super(props);

    const defaultState = { todos: [] };
    this.state = props.initialState ? props.initialState : defaultState;
  }

  /* TODO: find out why it may be useful to insert
   * your state Functions inside the state
   * (e.g.: https://reactjs.org/docs/context.html#updating-context-from-a-nested-component)
   */

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

  render() {
    return (
      <ContextTodoList.Provider
        value={{
          state: {
            ...this.state,
          },
          actions: {
            createTodoItem: this.createTodoItem,
            updateTodoItem: this.updateTodoItem,
            removeTodoItem: this.removeTodoItem,
          },
        }}
      >
        <>
          <h1>Context Todo</h1>
          {/* the two consumer seem useless here, but imagine them somewhere nested in our UI */}
          <ContextTodoList.Consumer>
            {({ actions }) => <CreateTodoInput createTodoItem={actions.createTodoItem} />}
          </ContextTodoList.Consumer>
          <ContextTodoList.Consumer>
            {({ state, actions }) => (
              <TodoList
                todos={state.todos}
                removeTodoItem={actions.removeTodoItem}
                updateTodoItem={actions.updateTodoItem}
              />
            )}
          </ContextTodoList.Consumer>
        </>
      </ContextTodoList.Provider>
    );
  }
}
