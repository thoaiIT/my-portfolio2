import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TrionnRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const TrionnReveal: React.FC<TrionnRevealProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 60,
      willChange: 'transform, opacity'
    })

    // Create scroll-based animation that immediately responds to scroll direction
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 90%', // Start earlier
        end: 'bottom 10%', // End later for full range
        scrub: 0.3, // Quick response
        onUpdate: (self) => {
          const progress = self.progress
          
          // Direct animation based on scroll progress
          gsap.to(element, {
            opacity: progress,
            y: 60 * (1 - progress),
            duration: 0,
            ease: 'none',
            overwrite: 'auto'
          })
        },
        onToggle: self => {
          if (self.isActive) {
            gsap.set(element, { willChange: 'transform, opacity' })
          } else {
            gsap.set(element, { willChange: 'auto' })
          }
        }
      }
    })

    return () => {
      tl.kill()
      gsap.set(element, { willChange: 'auto' })
    }
  }, [delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default TrionnReveal