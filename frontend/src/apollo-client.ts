import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getAccessToken } from './lib/persistCache/token';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// `uploadLink` is a terminating link
const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_BE_URI,
  headers: {
    'Apollo-Require-Preflight': 'true',
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client;
