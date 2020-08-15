import React from 'react';
import Layout from './components/Layout';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://promoted-cougar-66.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout />
      </div>
    </ApolloProvider>
  );
};

export default App;
