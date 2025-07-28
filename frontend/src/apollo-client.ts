import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { clearAccessToken, getAccessToken } from './lib/persistCache/token';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { onError } from '@apollo/client/link/error';
import toast from 'react-hot-toast';
import { clearUserFromCache } from './lib/persistCache/auth';
import { useLoadingStore } from './store/loading.store';

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
        clearUserFromCache();
        clearAccessToken();
      } else {
        toast.error(err.message);
      }
    }
  }

  if (networkError) {
    toast.error(`[Network error]: ${networkError}`);
  }
});

let activeRequests = 0;

const loadingLink = new ApolloLink((operation, forward) => {
  activeRequests++;

  if (activeRequests === 1) {
    useLoadingStore.getState().setLoading(true);
  }

  return forward(operation).map((result) => {
    activeRequests--;

    if (activeRequests === 0) {
      useLoadingStore.getState().setLoading(false);
    }

    return result;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([loadingLink, errorLink, uploadLink]),
  cache: new InMemoryCache({
    resultCaching: true,
  }),
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client;
