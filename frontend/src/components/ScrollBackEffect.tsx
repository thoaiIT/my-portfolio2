import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollBackEffectProps {
  children: React.ReactNode
  className?: string
  blurAmount?: number
  scaleAmount?: number
  rotateAmount?: number
  fadeAmount?: number
}

const ScrollBackEffect: React.FC<ScrollBackEffectProps> = ({
  children,
  className = '',
  blurAmount = 5,
  scaleAmount = 0.95,
  rotateAmount = 2,
  fadeAmount = 0.8
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollingBack, setIsScrollingBack] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTriggerInstance: ScrollTrigger

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY < lastScrollY.current ? 'up' : 'down'
      
      if (scrollDirection === 'up' && !isScrollingBack) {
        setIsScrollingBack(true)
        
        // Apply effects when scrolling back
        gsap.to(container, {
          filter: `blur(${blurAmount}px)`,
          scale: scaleAmount,
          rotation: rotateAmount,
          opacity: fadeAmount,
          duration: 0.6,
          ease: 'power2.out'
        })

        // Add a subtle color shift
        gsap.to(container, {
          '--scroll-back-hue': '10deg',
          duration: 0.6,
          ease: 'power2.out'
        })
      }
      
      lastScrollY.current = currentScrollY
      
      // Clear existing timeout
      clearTimeout(scrollTimeout.current)
      
      // Reset after scrolling stops
      scrollTimeout.current = setTimeout(() => {
        if (isScrollingBack) {
          setIsScrollingBack(false)
          gsap.to(container, {
            filter: 'blur(0px)',
            scale: 1,
            rotation: 0,
            opacity: 1,
            '--scroll-back-hue': '0deg',
            duration: 0.8,
            ease: 'power3.inOut'
          })
        }
      }, 300)
    }

    // Create more advanced scroll-triggered animations
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        
        // Add dynamic effects based on scroll velocity
        if (velocity < -300) { // Fast upward scroll
          const children = container.children
          gsap.to(children, {
            y: (index) => index * 5,
            rotation: (index) => index % 2 === 0 ? 2 : -2,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out'
          })
        } else if (velocity < 0) { // Normal upward scroll
          const children = container.children
          gsap.to(children, {
            y: 0,
            rotation: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out'
          })
        }
      }
    })

    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout.current)
      if (scrollTriggerInstance) scrollTriggerInstance.kill()
    }
  }, [isScrollingBack, blurAmount, scaleAmount, rotateAmount, fadeAmount])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        '--scroll-back-hue': '0deg',
        filter: 'hue-rotate(var(--scroll-back-hue))',
        willChange: 'transform, filter, opacity'
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export default ScrollBackEffect