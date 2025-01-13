import React, { Suspense } from 'react';
import Loading from './components/loading';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import AppRoutes from './routes/appRoutes';
import { useLoadingStore } from './store/loading.store';

const App: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Suspense fallback={<Loading isLoading />}>
      <ApolloProvider client={client}>
        <Loading isLoading={isLoading} />
        <AppRoutes />
      </ApolloProvider>
    </Suspense>
  );
};

export default App;
