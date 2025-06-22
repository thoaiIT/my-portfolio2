import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface InstantRevealProps {
  children: React.ReactNode
  className?: string
  yOffset?: number
}

const InstantReveal: React.FC<InstantRevealProps> = ({
  children,
  className = '',
  yOffset = 50
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: yOffset
    })

    // Create scroll trigger that updates based on element position in viewport
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom', // Start as soon as element enters viewport
      end: 'bottom top', // End when element leaves viewport
      onUpdate: (self) => {
        // Get element bounds
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate progress based on element center position in viewport
        // 0 = below viewport, 1 = center of viewport, 2 = above viewport
        const elementCenter = rect.top + rect.height / 2
        const viewportProgress = 1 - (elementCenter / windowHeight)
        
        // Clamp progress between 0 and 1
        const progress = Math.max(0, Math.min(1, viewportProgress))
        
        // Kill existing animation for immediate response
        if (animationRef.current) {
          animationRef.current.kill()
        }
        
        // Apply animation with no duration for instant response
        animationRef.current = gsap.to(element, {
          opacity: progress,
          y: yOffset * (1 - progress),
          duration: 0.2, // Small duration for smoothness
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill()
      })
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [yOffset])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default InstantReveal