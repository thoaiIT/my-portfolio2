import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  staggerDelay?: number
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  stagger = false,
  staggerDelay = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = stagger ? Array.from(container.children) : [container]
    
    elements.forEach((element, index) => {
      const el = element as HTMLElement
      
      // Set initial state
      gsap.set(el, {
        opacity: 0,
        y: 80,
        scale: 0.95
      })

      // Create scroll-based animation
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'top 15%',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress
          const delay = stagger ? index * staggerDelay : 0
          const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)))
          
          gsap.set(el, {
            opacity: adjustedProgress,
            y: 80 * (1 - adjustedProgress),
            scale: 0.95 + (0.05 * adjustedProgress),
            ease: 'none'
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [stagger, staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default ScrollAnimation