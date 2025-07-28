import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  onLoadingComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progressBar = progressBarRef.current;
    const progressFill = progressFillRef.current;
    const percent = percentRef.current;

    if (!container || !logo || !progressBar || !progressFill || !percent)
      return;

    // Initial animation
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(logo, { scale: 0.8, opacity: 0 });
    gsap.set(progressBar, { scaleX: 0, opacity: 0 });
    gsap.set(progressFill, { scaleX: 0 });
    gsap.set(percent, { opacity: 0 });

    // Animate logo
    tl.to(logo, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })

      // Animate progress bar container
      .to(
        progressBar,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // Show percentage
      .to(
        percent,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      );

    // Animate progress fill
    const progress = { value: 0 };
    tl.to(progress, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentProgress = Math.round(progress.value);
        percent.textContent = `${currentProgress}%`;
        gsap.set(progressFill, { scaleX: progress.value / 100 });
      },
    });

    // Add pulsing effect to logo
    gsap.to(logo, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([logo, progressBar, progressFill, progress]);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isVisible) {
      const container = containerRef.current;
      const logo = logoRef.current;
      const progressBar = progressBarRef.current;
      const percent = percentRef.current;

      if (!container || !logo || !progressBar || !percent) return;

      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          if (onLoadingComplete) onLoadingComplete();
        },
      });

      tl.to(percent, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
        .to(
          progressBar,
          {
            scaleY: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '-=0.2'
        )
        .to(
          logo,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '-=0.3'
        )
        .to(
          container,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '-=0.2'
        );
    }
  }, [isLoading, isVisible, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
    >
      {/* Logo/Brand */}
      <div ref={logoRef} className="mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
          <span className="text-white text-3xl font-bold">P</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 relative">
        <div
          ref={progressBarRef}
          className="h-1 bg-gray-800 rounded-full overflow-hidden transform origin-left"
        >
          <div
            ref={progressFillRef}
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transform origin-left"
          />
        </div>

        {/* Percentage */}
        <div className="mt-4 text-center">
          <span ref={percentRef} className="text-gray-400 text-sm font-light">
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
