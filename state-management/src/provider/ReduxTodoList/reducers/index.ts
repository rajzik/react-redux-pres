import { combineReducers } from 'redux';
import { Todo, ITodo } from '../../../types';
import { ETypes as TodoActions, Actions } from '../actions';

import * as helper from '../../../helpers';

const todoReducer = (state: ITodo[] = [], action: Actions) => {
  switch (action.type) {
    case TodoActions.CREATE_TODO:
      const { title } = action.payload;
      return helper.create(state, new Todo(title));
    case TodoActions.UPDATE_TODO:
      const { todoId, todo } = action.payload;
      return helper.update(state, todoId, todo);
    case TodoActions.REMOVE_TODO:
      const { todoId: todoIdRemove } = action.payload;
      return helper.remove(state, todoIdRemove);
    default:
      return state;
  }
};

export const mainReducer = combineReducers({
  todos: todoReducer,
});

export interface IMainReducer {
  todos: ITodo[];
}
/**
 * your Redux Store is defined by the reducers
 * initialState = {
 *   todos: []
 * }
 */
