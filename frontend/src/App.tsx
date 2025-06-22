import React, { Suspense, useState, useEffect } from 'react';
import Loading from './components/Loading';
import PageTransition from './components/PageTransition';
import CreativeLoader from './components/CreativeLoader';
import AppRoutes from './routes/appRoutes';
import { useLoadingStore } from './store/loading.store';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if all critical resources are loaded
    const handleLoad = () => {
      // Add a small delay for smoother transition
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1500);
    };

    // If document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleLoadingComplete = () => {
    // Delay showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      <CreativeLoader 
        isLoading={isInitialLoad} 
        onComplete={handleLoadingComplete}
      />
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Suspense fallback={<Loading isLoading />}>
          <Loading isLoading={isLoading} />
          <PageTransition key={location.pathname}>
            <AppRoutes />
          </PageTransition>
        </Suspense>
      </div>
    </>
  );
};

export default App;
