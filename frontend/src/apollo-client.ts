import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_BE_URI, // Đường dẫn GraphQL server
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});

export default client;
