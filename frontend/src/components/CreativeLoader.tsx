import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CreativeLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const CreativeLoader: React.FC<CreativeLoaderProps> = ({
  isLoading,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const circles = circlesRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;

    if (!container || !text || !overlay || circles.length === 0) return;

    // Set initial states
    gsap.set(circles, { scale: 0, opacity: 0 });
    gsap.set(text, { opacity: 0, y: 20 });
    gsap.set(overlay, { scaleY: 1, transformOrigin: 'bottom' });

    // Create loading animation timeline
    const tl = gsap.timeline();

    // Animate circles
    tl.to(circles, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    });

    // Add rotation to circles
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        rotation: 360,
        duration: 2 + index * 0.5,
        repeat: -1,
        ease: 'none',
      });
    });

    // Animate text
    tl.to(
      text,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Add floating animation to text
    gsap.to(text, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([circles, text]);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const container = containerRef.current;
      const circles = circlesRef.current;
      const text = textRef.current;
      const overlay = overlayRef.current;

      if (!container || !text || !overlay) return;

      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Fade out elements
      tl.to(text, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      })
        .to(
          circles,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.in(1.7)',
          },
          '-=0.2'
        )
        .to(
          overlay,
          {
            scaleY: 0,
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.2'
        );
    }
  }, [isLoading, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none">
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-auto"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={(el) => (circlesRef.current[i] = el!)}
                className="absolute rounded-full border-2 border-orange-500"
                style={{
                  width: `${(i + 1) * 60}px`,
                  height: `${(i + 1) * 60}px`,
                  opacity: 0.3 - i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <div ref={textRef} className="relative z-10 text-center">
            <h3 className="text-white text-lg font-light tracking-wider">
              LOADING
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeLoader;
