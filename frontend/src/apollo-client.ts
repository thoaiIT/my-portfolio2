import { ApolloClient, InMemoryCache } from '@apollo/client';
import { clearAccessToken, getAccessToken } from './lib/persistCache/token';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { onError } from '@apollo/client/link/error';
import toast from 'react-hot-toast';
import { clearUserFromCache } from './lib/persistCache/auth';

// `uploadLink` is a terminating link
const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_BE_URI,
  headers: {
    'Apollo-Require-Preflight': 'true',
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Kiểm tra lỗi 401 từ server
      if (
        err.extensions?.status === 401 ||
        err.message.includes('Unauthorized')
      ) {
        toast.error('Token expired or invalid. Logging out...');
      }
    }
  }

  clearUserFromCache();
  clearAccessToken();

  if (networkError) {
    toast.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(uploadLink),
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client;
