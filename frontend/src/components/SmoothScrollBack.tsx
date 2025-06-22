import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollBackProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

const SmoothScrollBack: React.FC<SmoothScrollBackProps> = ({
  children,
  className = '',
  intensity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Track scroll direction
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up')
      }
      
      lastScrollY.current = currentScrollY
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }

    // Main scroll trigger for viewport detection
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress
        const velocity = self.getVelocity()
        const isInViewport = progress > 0.1 && progress < 0.9
        
        if (isInViewport) {
          // Scrolling up effects
          if (velocity < -50) {
            const blurAmount = Math.min(Math.abs(velocity) / 500, 3) * intensity
            const scaleAmount = 1 - (Math.min(Math.abs(velocity) / 2000, 0.05) * intensity)
            const opacityAmount = 1 - (Math.min(Math.abs(velocity) / 3000, 0.2) * intensity)
            
            gsap.to(container, {
              filter: `blur(${blurAmount}px)`,
              scale: scaleAmount,
              opacity: opacityAmount,
              y: velocity * 0.02 * intensity,
              duration: 0.2,
              ease: 'power2.out'
            })
            
            // Add perspective shift
            gsap.to(container, {
              rotationX: Math.min(Math.abs(velocity) / 200, 5) * intensity,
              transformPerspective: 1000,
              duration: 0.2,
              ease: 'power2.out'
            })
          } 
          // Scrolling down effects
          else if (velocity > 50) {
            gsap.to(container, {
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.5,
              ease: 'power3.out'
            })
          } 
          // Idle state
          else {
            gsap.to(container, {
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              ease: 'power3.inOut'
            })
          }
        }
      }
    })

    // Add smooth entrance animation
    gsap.fromTo(container, 
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [intensity])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        willChange: 'transform, filter, opacity',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </div>
  )
}

export default SmoothScrollBack