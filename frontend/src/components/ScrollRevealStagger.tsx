import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
}

const ScrollRevealStagger: React.FC<ScrollRevealStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  baseDelay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.children
    
    // Initial state
    gsap.set(elements, {
      opacity: 0,
      y: 30,
      scale: 0.95
    })

    // Create staggered reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        each: staggerDelay,
        from: 'start'
      },
      ease: 'power3.out',
      delay: baseDelay
    })

    // Add hover effects to each element
    Array.from(elements).forEach((element) => {
      const el = element as HTMLElement
      
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        const direction = self.direction
        
        // Add subtle rotation based on scroll speed
        if (Math.abs(velocity) > 500) {
          gsap.to(elements, {
            rotationY: direction * 2,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out'
          })
        } else {
          gsap.to(elements, {
            rotationY: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out'
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [staggerDelay, baseDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default ScrollRevealStagger