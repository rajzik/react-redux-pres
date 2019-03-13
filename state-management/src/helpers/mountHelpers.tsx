import React from 'react';

import { ApolloLinkStateTodoList, mountWithApollo } from '../provider/ApoloLinkTodoList';
import { ContextTodoList } from '../provider/ContextTodoList';
import { ConnectedReduxTodoList, mountWithRedux } from '../provider/ReduxTodoList';
import { StateTodoList } from '../provider/StateTodoList';
import { mountUnstated, TodoListContainer, UnstatedTodoList } from '../provider/UnstatedTodoList';

export const mountWithInitialProps = (initialState: any, C: any) => (
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
};

export const renderWithProvider = ({ component, mounter }: any, initialState: any) =>
  mounter(initialState, component);
