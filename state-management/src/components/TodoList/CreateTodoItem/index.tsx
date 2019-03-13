import React, { FormEvent, KeyboardEvent } from 'react';
import { Input } from 'antd';
import { ITodo } from '../../../types';

interface IProps {
  createTodoItem: (todoTitle: string) => void;
}

export class CreateTodoInput extends React.Component<IProps> {
  static initialState = {
    value: '',
  };
  state = {
    ...CreateTodoInput.initialState,
  };
  changeValue = ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
    this.setState({ value });
  };
  handlePressEnterNewTodo = ({ target }: KeyboardEvent<HTMLInputElement>) => {
    this.props.createTodoItem((target as any).value);
    this.setState({ ...CreateTodoInput.initialState });
  };

  render() {
    const { value } = this.state;
    return (
      <Input
        value={value}
        onChange={this.changeValue}
        placeholder="What needs to be done?"
        onPressEnter={this.handlePressEnterNewTodo}
      />
    );
  }
}
