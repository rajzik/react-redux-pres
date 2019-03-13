import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Query } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';

import { TodoList, CreateTodoInput } from '../components';

import { Todo, ITodo } from '../types';
import * as helper from '../helpers';

const defaultState = { todos: [] };

interface ITodos {
  todos: ITodo[];
}

interface IWithApollo {
  initialState: ITodos;
  Component: any;
}

export const mountWithApollo = (
  { initialState, Component }: IWithApollo = {
    initialState: defaultState,
    Component: () => null,
  }
) => {
  const cache = new InMemoryCache();
  // define the initial Store

  const stateLink = withClientState({
    cache,
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected,
            },
          };
          cache.writeData({ data });
          return null;
        },
      },
    },
    defaults: initialState,
  });
  const client = new ApolloClient({
    cache,
    link: stateLink,
  });

  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
};

// We are querying our local State with GraphQL
// @client defines that this element is called from cache
const TODO_QUERY = gql`
  {
    todos @client {
      id
      title
      finished
    }
  }
`;

export class ApolloLinkStateTodoList extends React.Component {
  removeTodoItem = (cache: ApolloClient<any>, queryData: ITodos) => (todoId: number) => {
    const currentTodos = queryData.todos;
    cache.writeData({
      data: {
        todos: helper.remove(currentTodos, todoId),
      },
    });
  };

  createTodoItem = (cache: ApolloClient<any>, queryData: ITodos) => (todoTitle: string) => {
    const currentTodos = queryData.todos;
    cache.writeData({
      data: {
        todos: helper.create(currentTodos, new Todo(todoTitle)),
      },
    });
  };

  updateTodoItem = (cache: ApolloClient<any>, queryData: ITodos) => (
    todoId: number,
    todo: ITodo
  ) => {
    const currentTodos = queryData.todos;
    cache.writeData({
      data: {
        todos: helper.update(currentTodos, todoId, todo),
      },
    });
  };

  render() {
    return (
      <Query<ITodos> query={TODO_QUERY}>
        {({ client, data }) => (
          <React.Fragment>
            <h1>Apollo Link State Todo</h1>
            <CreateTodoInput createTodoItem={this.createTodoItem(client, data || { todos: [] })} />
            <TodoList
              todos={(data || { todos: [] }).todos}
              removeTodoItem={this.removeTodoItem(client, data || { todos: [] })}
              updateTodoItem={this.updateTodoItem(client, data || { todos: [] })}
            />
          </React.Fragment>
        )}
      </Query>
    );
  }
}
