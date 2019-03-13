import React from 'react';

import { ApolloLinkStateTodoList, mountWithApollo } from '../provider/ApolloLinkStateTodoList';
import { ContextTodoList } from '../provider/ContextTodoList';
import { ConnectedReduxThunkTodoList, mountWithReduxThunk } from '../provider/ReduxThunkTodoList';
import { ConnectedReduxTodoList, mountWithRedux } from '../provider/ReduxTodoList';
import { StateTodoList } from '../provider/StateTodoList';
import { mountUnstated, TodoListContainer, UnstatedTodoList } from '../provider/UnstatedTodoList';

export const mountWithInitialProps = (initialState, C) => (
  <C initialState={initialState ? { ...initialState } : null} />
);

export const providers = {
  StateTodoList: {
    component: StateTodoList,
    mounter: mountWithInitialProps,
  },
  ContextTodoList: {
    component: ContextTodoList,
    mounter: mountWithInitialProps,
  },
  UnstatedTodoList: {
    component: UnstatedTodoList,
    mounter: mountUnstated(TodoListContainer),
  },
  ApolloLinkStateTodoList: {
    component: ApolloLinkStateTodoList,
    mounter: mountWithApollo,
  },
  ReduxTodoList: {
    component: ConnectedReduxTodoList,
    mounter: mountWithRedux,
  },
  ReduxThunkTodoList: {
    component: ConnectedReduxThunkTodoList,
    mounter: mountWithReduxThunk,
  },
};

export const renderWithProvider = ({ component, mounter }, initialState) =>
  mounter(initialState, component);
