import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TrionnStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

const TrionnStagger: React.FC<TrionnStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  baseDelay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray(container.children);

    // Set initial state for all elements
    gsap.set(elements, {
      opacity: 0,
      y: 40,
      willChange: 'transform, opacity',
    });

    // Create individual ScrollTriggers for each element for immediate response
    elements.forEach((element, index) => {
      const el = element as HTMLElement;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          const delayOffset = index * staggerDelay;
          const adjustedProgress = Math.max(0, Math.min(1, progress));

          gsap.to(el, {
            opacity: adjustedProgress,
            y: 40 * (1 - adjustedProgress),
            duration: 0,
            delay: baseDelay + delayOffset,
            ease: 'none',
            overwrite: 'auto',
          });
        },
        onToggle: (self) => {
          if (self.isActive) {
            gsap.set(el, { willChange: 'transform, opacity' });
          } else {
            gsap.set(el, { willChange: 'auto' });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (container.contains(trigger.trigger as Element)) {
          trigger.kill();
        }
      });
      gsap.set(elements, { willChange: 'auto' });
    };
  }, [staggerDelay, baseDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TrionnStagger;
