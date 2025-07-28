import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 1,
  stagger = 0.1,
  direction = 'up',
  threshold = 0.2,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on animation type
    const initialState: gsap.TweenVars = {};
    const animateState: gsap.TweenVars = {
      opacity: 1,
      delay,
      duration,
      ease: 'power3.out',
    };

    switch (animation) {
      case 'fade':
        initialState.opacity = 0;
        break;

      case 'slide':
        initialState.opacity = 0;
        switch (direction) {
          case 'up':
            initialState.y = 50;
            animateState.y = 0;
            break;
          case 'down':
            initialState.y = -50;
            animateState.y = 0;
            break;
          case 'left':
            initialState.x = 50;
            animateState.x = 0;
            break;
          case 'right':
            initialState.x = -50;
            animateState.x = 0;
            break;
        }
        break;

      case 'scale':
        initialState.opacity = 0;
        initialState.scale = 0.8;
        animateState.scale = 1;
        break;

      case 'rotate':
        initialState.opacity = 0;
        initialState.rotation = direction === 'left' ? -15 : 15;
        animateState.rotation = 0;
        break;
    }

    // Apply initial state
    gsap.set(element, initialState);

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${100 - threshold * 100}%`,
      once: true,
      onEnter: () => {
        // Animate children with stagger if they exist
        const children = element.children;
        if (children.length > 0 && stagger > 0) {
          gsap.to(children, {
            ...animateState,
            stagger,
          });
        } else {
          gsap.to(element, animateState);
        }
      },
    });

    // Cleanup
    return () => {
      trigger.kill();
    };
  }, [animation, delay, duration, stagger, direction, threshold]);

  return <div ref={elementRef}>{children}</div>;
};

export default ScrollReveal;
