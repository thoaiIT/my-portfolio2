import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SmoothReveal: React.FC<SmoothRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 100,
      scale: 0.9,
    });

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1, // Smooth scrubbing tied to scroll position
        onUpdate: (self) => {
          const progress = self.progress;

          // Smooth animation based on scroll progress
          gsap.to(element, {
            opacity: progress,
            y: 100 * (1 - progress),
            scale: 0.9 + 0.1 * progress,
            duration: 0,
            ease: 'none',
            overwrite: 'auto',
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default SmoothReveal;
