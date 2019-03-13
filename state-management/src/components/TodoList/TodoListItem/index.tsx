import { Checkbox, Icon, Input, List } from 'antd';
import React, { createRef, FormEvent, KeyboardEvent } from 'react';

import { ITodo } from '../../../types';

interface IProps {
  item: ITodo;
  removeTodoItem: (id: number) => void;
  updateTodoItem: (id: number, todo: ITodo) => void;
}

interface IState {
  editing: boolean;
  editValue: string;
}

export class TodoListItem extends React.Component<IProps, IState> {
  static initialState = {
    editing: false,
    editValue: '',
  };

  state = {
    editing: false,
    editValue: '',
  };

  editInputRef = createRef<Input>();

  handlePressEnterEditTodo = () => {
    const newCurrentEditedTodo = { ...this.props.item };
    newCurrentEditedTodo.title = this.state.editValue;
    this.props.updateTodoItem(this.props.item.id, newCurrentEditedTodo);
    this.setState({ ...TodoListItem.initialState });
  };

  updateStateInputValue = (key: string) => ({
    currentTarget: { value },
  }: FormEvent<HTMLInputElement>) => {
    const stateChange: any = {};
    stateChange[key] = value;
    this.setState(stateChange);
  };

  toggleTodoItem = (todo: ITodo) => {
    this.props.updateTodoItem(todo.id, { ...todo, finished: !todo.finished });
  };

  toggleEditing = () => {
    this.setState(
      state => {
        return {
          editing: !state.editing,
          editValue: state.editing ? this.props.item.title : '',
        };
      },
      () => {
        if (this.state.editing) {
          const { current } = this.editInputRef;
          if (current) {
            current.input.focus();
          }
        }
      }
    );
  };

  handleKeyDown = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27) {
      this.setState(TodoListItem.initialState);
    }
  };

  render() {
    const {
      editInputRef,
      props,
      state,
      updateStateInputValue,
      handleKeyDown,
      handlePressEnterEditTodo,
      toggleEditing,
    } = this;
    const { item, removeTodoItem } = props;
    const { editing, editValue } = state;
    if (editing) {
      return (
        <List.Item data-testid="list-item">
          <Input
            ref={editInputRef}
            value={editValue}
            onChange={updateStateInputValue('editValue')}
            onKeyDown={handleKeyDown}
            onPressEnter={handlePressEnterEditTodo}
          />
        </List.Item>
      );
    }
    return (
      <List.Item
        data-testid="list-item"
        actions={[
          <Icon data-testid="edit-todo" type="edit" theme="filled" onClick={toggleEditing} />,
          <Icon
            data-testid="remove-todo"
            type="close-circle"
            theme="filled"
            onClick={() => removeTodoItem(item.id)}
          />,
        ]}
      >
        <Checkbox
          data-testid="checkbox"
          value={item.finished}
          checked={item.finished}
          onChange={() => this.toggleTodoItem(item)}
        >
          <span data-testid="title">{item.title}</span>
        </Checkbox>
      </List.Item>
    );
  }
}
