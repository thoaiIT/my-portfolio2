import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingAnimationProps {
  onComplete?: () => void
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const progress = progressRef.current
    const text = textRef.current
    const counter = counterRef.current
    
    if (!container || !progress || !text || !counter) return

    // Initial setup
    gsap.set(container, { opacity: 1 })
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(text, { opacity: 0, y: 20 })
    
    // Create loading timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out animation
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
            if (container.parentNode) {
              container.parentNode.removeChild(container)
            }
          }
        })
      }
    })

    // Animate text in
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    })

    // Animate progress bar and counter
    let counterObj = { value: 0 }
    tl.to(progress, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut'
    })
    .to(counterObj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = Math.round(counterObj.value) + '%'
      }
    }, '<')

    // Add subtle floating animation to text
    gsap.to(text, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    return () => {
      tl.kill()
      gsap.killTweensOf([container, progress, text, counterObj])
    }
  }, [onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{ pointerEvents: 'all' }}
    >
      <div className="w-full max-w-md px-8">
        <div ref={textRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
            Loading Experience
          </h2>
          <p className="text-gray-400 text-sm">
            <span ref={counterRef}>0%</span>
          </p>
        </div>
        
        <div className="relative h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingAnimation