import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorOutlineRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const cursorOutline = cursorOutlineRef.current
    if (!cursorDot || !cursorOutline) return

    // Set initial position and make visible
    gsap.set([cursorDot, cursorOutline], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 1
    })

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Inner dot follows immediately
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
      })
      
      // Outer circle follows with smooth delay
      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Hover handlers for interactive elements
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement
      
      // Check if hovering over interactive elements
      if (target.matches('a, button, input, textarea, [data-cursor="pointer"]')) {
        gsap.to(cursorOutline, {
          scale: 1.5,
          borderColor: 'white',
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement
      
      if (target.matches('a, button, input, textarea, [data-cursor="pointer"]')) {
        gsap.to(cursorOutline, {
          scale: 1,
          borderColor: 'white',
          borderWidth: '1px',
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 0,
        duration: 0.3
      })
    }

    const handleMouseEnter = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 1,
        duration: 0.3
      })
    }

    // Add magnetic effect to buttons and links
    const addMagneticEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches('a, button')) {
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(target, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const removeMagneticEffect = (e: Event) => {
      const target = e.target as HTMLElement
      
      if (target.matches('a, button')) {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousemove', addMagneticEffect)
    document.addEventListener('mouseout', removeMagneticEffect)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousemove', addMagneticEffect)
      document.removeEventListener('mouseout', removeMagneticEffect)
    }
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          left: 0,
          top: 0,
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        }}
      />
      <div
        ref={cursorOutlineRef}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'border-width 0.3s ease, border-color 0.3s ease',
          left: 0,
          top: 0
        }}
      />
    </>,
    document.body
  )
}

export default CustomCursor