import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ViewportStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  yOffset?: number
}

const ViewportStagger: React.FC<ViewportStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.06,
  yOffset = 25
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>()
  const progressRefs = useRef<number[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = Array.from(container.children) as HTMLElement[]
    
    // Initialize progress tracking for smooth interpolation
    progressRefs.current = new Array(elements.length).fill(0)
    
    // Set initial state
    elements.forEach(el => {
      gsap.set(el, {
        opacity: 0,
        y: yOffset
      })
    })

    const updateAnimations = () => {
      const windowHeight = window.innerHeight
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect()
        
        let targetProgress = 0
        
        // Smooth transition zones with stagger
        const staggerOffset = index * staggerDelay * 100 // Convert to pixels
        const fadeInStart = windowHeight * 0.95 - staggerOffset
        const fadeInEnd = windowHeight * 0.65 - staggerOffset
        const fadeOutStart = windowHeight * 0.35
        const fadeOutEnd = windowHeight * 0.05
        
        if (rect.bottom < 0 || rect.top > windowHeight) {
          // Outside viewport
          targetProgress = 0
        } else if (rect.top > fadeInStart) {
          // Entering from bottom
          targetProgress = 0
        } else if (rect.top > fadeInEnd) {
          // Fading in
          targetProgress = 1 - ((rect.top - fadeInEnd) / (fadeInStart - fadeInEnd))
        } else if (rect.bottom < fadeOutEnd) {
          // Leaving from top
          targetProgress = 0
        } else if (rect.bottom < fadeOutStart) {
          // Fading out
          targetProgress = (rect.bottom - fadeOutEnd) / (fadeOutStart - fadeOutEnd)
        } else {
          // Fully visible in viewport
          targetProgress = 1
        }
        
        // Clamp between 0 and 1
        targetProgress = Math.max(0, Math.min(1, targetProgress))
        
        // Smooth interpolation for each element
        const smoothingFactor = 0.08
        progressRefs.current[index] += (targetProgress - progressRefs.current[index]) * smoothingFactor
        
        // Apply smooth easing
        const easedProgress = gsap.parseEase('power2.inOut')(progressRefs.current[index])
        
        // Update element
        gsap.set(el, {
          opacity: easedProgress,
          y: yOffset * (1 - easedProgress),
          force3D: true,
          transformStyle: 'preserve-3d'
        })
        
        // Manage will-change
        if (progressRefs.current[index] > 0.01 && progressRefs.current[index] < 0.99) {
          if (el.style.willChange !== 'transform, opacity') {
            gsap.set(el, { willChange: 'transform, opacity' })
          }
        } else {
          if (el.style.willChange) {
            gsap.set(el, { willChange: 'auto' })
          }
        }
      })
    }

    // Animation loop for ultra-smooth updates
    let animating = true
    const animate = () => {
      if (animating) {
        updateAnimations()
        rafId.current = requestAnimationFrame(animate)
      }
    }
    
    // Start animation loop
    animate()

    return () => {
      animating = false
      if (rafId.current) cancelAnimationFrame(rafId.current)
      elements.forEach(el => {
        gsap.set(el, { willChange: 'auto', clearProps: 'all' })
      })
    }
  }, [staggerDelay, yOffset])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default ViewportStagger