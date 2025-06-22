import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page enter animation
      gsap.fromTo('.page-transition',
        { 
          opacity: 0,
        },
        { 
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        }
      )

      // Content fade in
      gsap.fromTo('.page-content',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          delay: 0.1,
          ease: 'power2.out'
        }
      )
    })

    return () => ctx.revert()
  }, [location])

  return (
    <div className="page-transition relative">
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageTransition