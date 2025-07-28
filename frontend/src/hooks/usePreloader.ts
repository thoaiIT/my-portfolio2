import { useState, useEffect } from 'react';

interface PreloaderOptions {
  minimumLoadTime?: number;
  images?: string[];
  fonts?: string[];
}

export const usePreloader = (options: PreloaderOptions = {}) => {
  const { minimumLoadTime = 1000, images = [], fonts = [] } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let loadedCount = 0;
    const totalAssets = images.length + fonts.length + 1; // +1 for document ready

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(newProgress);
    };

    // Preload images
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          updateProgress();
          resolve(true);
        };
        img.onerror = () => {
          updateProgress();
          resolve(false);
        };
        img.src = src;
      });
    });

    // Check fonts (simplified check)
    const fontPromises = fonts.map((fontFamily) => {
      return document.fonts
        .load(`16px ${fontFamily}`)
        .then(() => {
          updateProgress();
          return true;
        })
        .catch(() => {
          updateProgress();
          return false;
        });
    });

    // Wait for document ready
    const documentReady = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        updateProgress();
        resolve(true);
      } else {
        window.addEventListener('load', () => {
          updateProgress();
          resolve(true);
        });
      }
    });

    // Wait for all assets and minimum time
    Promise.all([...imagePromises, ...fontPromises, documentReady]).then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

      // Ensure minimum load time for smooth experience
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }, remainingTime);
    });
  }, [images, fonts, minimumLoadTime]);

  return { isLoading, progress };
};
