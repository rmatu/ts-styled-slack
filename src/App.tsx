import React from 'react';
import Layout from './components/Layout';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { StoreContextProvider } from './store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';

const wsLink = new WebSocketLink({
  uri: `wss://promoted-cougar-66.hasura.app/v1/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://promoted-cougar-66.hasura.app/v1/graphql',
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <StoreContextProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Layout />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </StoreContextProvider>
  );
};

export default App;
