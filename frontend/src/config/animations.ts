// Optimized animation configurations for Trionn-style effects

export const animationConfig = {
  // Durations
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9
  },

  // Easings
  ease: {
    out: 'power2.out',
    inOut: 'power2.inOut',
    smooth: 'power3.out'
  },

  // Distances
  distance: {
    small: 20,
    medium: 40,
    large: 60
  },

  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.15
  },

  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'top 30%',
    scrub: 0.5,
    markers: false
  }
}

// Reusable animation presets
export const animations = {
  fadeIn: {
    from: { opacity: 0, y: animationConfig.distance.medium },
    to: { 
      opacity: 1, 
      y: 0, 
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.out
    }
  },
  
  scaleIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { 
      scale: 1, 
      opacity: 1, 
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth
    }
  },
  
  slideIn: {
    from: { x: -animationConfig.distance.large, opacity: 0 },
    to: { 
      x: 0, 
      opacity: 1, 
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.out
    }
  }
}

// Performance optimization settings
export const performanceConfig = {
  // Disable animations on low-end devices
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Check for GPU acceleration support
  hasGPU: 'GPU' in window,
  
  // Optimal batch size for animations
  batchSize: 10,
  
  // Debounce delay for scroll events
  scrollDebounce: 10,
  
  // RAF throttle for smooth animations
  rafThrottle: 16 // ~60fps
}