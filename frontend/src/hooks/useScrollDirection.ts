import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  debounce?: number;
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}) => {
  const { threshold = 10, debounce = 50 } = options;
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        ticking.current = false;
        return;
      }

      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }

      // Debounce scroll end detection
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setScrollDirection(null);
      }, debounce);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(debounceTimeout.current);
    };
  }, [threshold, debounce]);

  return { scrollDirection, scrollY, isScrollingUp: scrollDirection === 'up' };
};
