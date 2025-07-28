import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

const HeroReveal: React.FC<HeroRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 40,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: yOffset,
      willChange: 'transform, opacity',
    });

    // Animate on mount with delay
    const tl = gsap.timeline({ delay });

    tl.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => {
        // Set up scroll-based animation after initial reveal
        gsap.set(element, { willChange: 'auto' });

        // Add viewport-based animation for when user scrolls back
        const handleScroll = () => {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Only fade out when leaving viewport from top
          if (rect.bottom < windowHeight * 0.2) {
            const progress = Math.max(0, rect.bottom / (windowHeight * 0.2));
            gsap.to(element, {
              opacity: progress,
              y: yOffset * (1 - progress) * 0.5, // Less movement when scrolling out
              duration: 0.3,
              ease: 'none',
              overwrite: 'auto',
            });
          } else if (rect.top < windowHeight) {
            // Ensure it's visible when in viewport
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'none',
              overwrite: 'auto',
            });
          }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      },
    });

    return () => {
      tl.kill();
      gsap.set(element, { willChange: 'auto' });
    };
  }, [delay, yOffset]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default HeroReveal;
