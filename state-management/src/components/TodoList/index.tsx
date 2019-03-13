import 'antd/dist/antd.css';

import { List } from 'antd';
import React from 'react';

import { ITodo } from '../../types';
import { TodoListItem } from './TodoListItem';

interface IProps {
  todos: ITodo[];
  removeTodoItem: (id: number) => void;
  updateTodoItem: (id: number, todo: ITodo) => void;
}

export const TodoList = (props: IProps) => {
  const { todos, updateTodoItem, removeTodoItem } = props;
  const unfinishedTodoCount = todos.filter(todo => !todo.finished).length;
  return (
    <List
      footer={<div> Tasks left: {unfinishedTodoCount}</div>}
      bordered
      data-testid="todo-list"
      dataSource={todos}
      renderItem={(item: ITodo) => (
        <TodoListItem item={item} updateTodoItem={updateTodoItem} removeTodoItem={removeTodoItem} />
      )}
    />
  );
};
export { TodoListItem };
export { CreateTodoInput } from './CreateTodoItem';
