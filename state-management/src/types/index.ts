import React from 'react';

export interface IEntity {
  id: number;
}

export interface ITodo extends IEntity {
  title: string;
  finished: boolean;
}

export class Todo implements ITodo {
  id = Math.random();
  __typename = 'TODO'; // needed for ApolloLinkState
  constructor(public title: string, public finished: boolean = false) {}
}

export interface IGeneralProps {
  initialState: {
    todos: ITodo[];
  };
}

export interface IGeneralState {
  todos: ITodo[];
}
