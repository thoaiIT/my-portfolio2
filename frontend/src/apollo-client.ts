import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { getAccessToken } from './lib/persistCache/token';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_BE_URI,
  }),
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client;
