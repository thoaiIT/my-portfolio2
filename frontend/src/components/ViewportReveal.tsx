import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ViewportRevealProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

const ViewportReveal: React.FC<ViewportRevealProps> = ({
  children,
  className = '',
  yOffset = 30,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const currentProgress = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: yOffset,
    });

    const updateAnimation = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = 0;

      // Calculate smooth progress based on position
      if (rect.bottom < 0 || rect.top > windowHeight) {
        // Fully outside viewport
        progress = 0;
      } else {
        // Smooth transition zones
        const fadeInStart = windowHeight * 0.9; // Start fading in at 90% viewport height
        const fadeInEnd = windowHeight * 0.6; // Fully visible at 60% viewport height
        const fadeOutStart = windowHeight * 0.4; // Start fading out at 40% viewport height
        const fadeOutEnd = windowHeight * 0.1; // Fully hidden at 10% viewport height

        if (rect.top > fadeInStart) {
          // Entering from bottom
          progress = 1 - (rect.top - fadeInEnd) / (fadeInStart - fadeInEnd);
        } else if (rect.bottom < fadeOutEnd) {
          // Leaving from top
          progress = rect.bottom / fadeOutEnd;
        } else if (rect.top > fadeInEnd && rect.bottom < fadeOutStart) {
          // Fully in comfortable viewing zone
          progress = 1;
        } else if (rect.top <= fadeInEnd && rect.top > fadeOutStart) {
          // In upper transition zone
          progress = 1;
        } else if (rect.bottom >= fadeOutEnd && rect.bottom < fadeOutStart) {
          // In lower transition zone
          progress = (rect.bottom - fadeOutEnd) / (fadeOutStart - fadeOutEnd);
        } else {
          // Default to visible
          progress = 1;
        }
      }

      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));

      // Smooth interpolation to target progress
      const smoothingFactor = 0.1;
      currentProgress.current +=
        (progress - currentProgress.current) * smoothingFactor;

      // Apply very smooth easing curve
      const easedProgress = gsap.parseEase('power3.inOut')(
        currentProgress.current
      );

      // Update element with smooth values
      gsap.set(element, {
        opacity: easedProgress,
        y: yOffset * (1 - easedProgress),
        force3D: true, // Enable GPU acceleration
      });

      // Manage will-change for performance
      if (currentProgress.current > 0.01 && currentProgress.current < 0.99) {
        if (element.style.willChange !== 'transform, opacity') {
          gsap.set(element, { willChange: 'transform, opacity' });
        }
      } else {
        if (element.style.willChange) {
          gsap.set(element, { willChange: 'auto' });
        }
      }
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateAnimation);
    };

    // Initial check
    updateAnimation();

    // Smooth passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      gsap.set(element, { willChange: 'auto', clearProps: 'all' });
    };
  }, [yOffset]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ViewportReveal;
