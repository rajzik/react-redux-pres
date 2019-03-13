import { ITodo } from '../../../types';

export enum ETypes {
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

export const createTodoItem = (title: string): ICreateTodoItem => ({
  type: ETypes.CREATE_TODO,
  payload: {
    title,
  },
});

export const updateTodoItem = (todoId: number, todo: ITodo): IUpdateTodoItem => ({
  type: ETypes.UPDATE_TODO,
  payload: {
    todo,
    todoId,
  },
});

export const removeTodoItem = (todoId: number): IRemoveTodoItem => ({
  type: ETypes.REMOVE_TODO,
  payload: {
    todoId,
  },
});

interface ICreateTodoItem {
  type: ETypes.CREATE_TODO;
  payload: {
    title: string;
  };
}

interface IRemoveTodoItem {
  type: ETypes.REMOVE_TODO;
  payload: {
    todoId: number;
  };
}

interface IUpdateTodoItem {
  type: ETypes.UPDATE_TODO;
  payload: {
    todoId: number;
    todo: ITodo;
  };
}

export type Actions = ICreateTodoItem | IUpdateTodoItem | IRemoveTodoItem;
