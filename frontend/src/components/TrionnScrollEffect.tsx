import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TrionnScrollEffectProps {
  children: React.ReactNode
  className?: string
}

const TrionnScrollEffect: React.FC<TrionnScrollEffectProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const isInitialized = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    // Initial setup
    if (!isInitialized.current) {
      gsap.set(content, {
        scale: 0.9,
        opacity: 0,
        y: 50
      })
      isInitialized.current = true
    }

    // Create main scroll trigger for reveal
    const revealTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'top 20%',
      onEnter: () => {
        gsap.to(content, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        })
      },
      onLeaveBack: () => {
        gsap.to(content, {
          scale: 0.95,
          opacity: 0.8,
          y: 20,
          duration: 0.8,
          ease: 'power2.inOut'
        })
      }
    })

    // Advanced scroll effects based on direction and speed
    let scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        const velocity = self.getVelocity()
        const direction = self.direction
        
        // Parallax effect on fast scroll
        if (Math.abs(velocity) > 1000) {
          gsap.to(content, {
            skewY: direction * 2,
            duration: 0.3,
            ease: 'power2.out'
          })
        } else {
          gsap.to(content, {
            skewY: 0,
            duration: 0.5,
            ease: 'power2.out'
          })
        }

        // Scale effect when in viewport
        if (progress > 0.2 && progress < 0.8) {
          const scaleValue = 1 - (Math.abs(progress - 0.5) * 0.1)
          gsap.to(content, {
            scale: scaleValue,
            duration: 0.3,
            ease: 'none'
          })
        }
      }
    })

    // Scroll direction handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingUp = currentScrollY < lastScrollY.current
      const delta = Math.abs(currentScrollY - lastScrollY.current)
      
      if (isScrollingUp && delta > 5) {
        // Add subtle rotation and blur on scroll up
        gsap.to(content, {
          rotationX: -2,
          filter: 'blur(1px)',
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(content, {
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
        })
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      revealTrigger.kill()
      scrollTriggerInstance.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ transformOrigin: 'center center' }}>
        {children}
      </div>
    </div>
  )
}

export default TrionnScrollEffect