import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/api/graphql',
});

export default client;
