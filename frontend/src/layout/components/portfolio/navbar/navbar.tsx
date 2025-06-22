import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useGSAP(() => {
    // Navbar animation on load
    gsap.fromTo('.nav-logo',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo('.nav-menu',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power3.out' }
    )
  })

  useGSAP(() => {
    if (isOpen) {
      // Background animation
      gsap.to('.menu-bg-layer', {
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.inOut'
      })

      // Close button animation
      gsap.fromTo('.menu-close-btn',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      )

      // Menu links stagger animation
      const menuLinks = document.querySelectorAll('.menu-link')
      menuLinks.forEach((link, index) => {
        const chars = link.querySelector('.menu-link-text')?.textContent?.split('') || []
        const textElement = link.querySelector('.menu-link-text')
        
        if (textElement) {
          textElement.innerHTML = chars
            .map(char => `<span class="inline-block char-span" style="transform-origin: center bottom;">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('')
          
          // Initial state
          gsap.set(link, { opacity: 0 })
          gsap.set(textElement.querySelectorAll('.char-span'), { 
            y: 100, 
            rotateX: -90,
            opacity: 0 
          })
          
          // Animate in
          gsap.to(link, {
            opacity: 1,
            duration: 0.3,
            delay: 0.2 + index * 0.08
          })
          
          gsap.to(textElement.querySelectorAll('.char-span'), {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.015,
            delay: 0.2 + index * 0.08,
            ease: 'power3.out'
          })
        }
      })

      // Footer animation
      gsap.fromTo('.menu-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      )

      // Add floating animation to background shapes
      gsap.to('.float-shape', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1.5,
          from: 'random'
        }
      })
    } else {
      gsap.set('.menu-bg-layer', { scale: 0 })
    }
  }, [isOpen])

  useEffect(() => {
    // Close menu on route change
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const menuItems = [
    { name: 'Home', path: '/', description: 'Back to start' },
    { name: 'Work', path: '/work', description: 'Selected projects' },
    { name: 'About', path: '/about', description: 'Get to know me' },
    { name: 'Skills', path: '/skills', description: 'Technical expertise' },
    { name: 'Lab', path: '/lab', description: 'Experiments & fun' },
    { name: 'Contact', path: '/contact', description: "Let's connect" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="nav-logo text-2xl font-bold text-white relative group">
            <span className="relative z-10">Portfolio</span>
            <span className="absolute inset-0 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-menu relative z-[60] flex flex-col items-end gap-1 p-2 group"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-6 group-hover:w-5'}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-3 group-hover:w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Full screen menu overlay */}
      <div 
        className="menu-overlay fixed top-0 left-0 w-full h-full bg-black z-[55] pointer-events-none overflow-hidden"
        style={{ 
          clipPath: isOpen ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          width: '100vw',
          height: '100vh',
          position: 'fixed'
        }}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0">
          <div className="menu-bg-layer absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" style={{ transform: 'scale(0)' }} />
          <div className="menu-bg-layer absolute inset-0 bg-gradient-to-tr from-orange-950/10 to-transparent" style={{ transform: 'scale(0)' }} />
          
          {/* Subtle floating shapes */}
          <div className="float-shape absolute top-1/4 left-1/4 w-48 h-48 bg-orange-500/3 rounded-full blur-3xl" />
          <div className="float-shape absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/2 rounded-full blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="menu-close-btn absolute top-6 right-6 md:right-12 lg:right-24 z-[60] p-4 text-white hover:text-orange-400 transition-colors group"
          aria-label="Close menu"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="h-full flex flex-col px-6 md:px-12 lg:px-24 py-20 overflow-y-auto relative z-10" style={{ maxHeight: '100vh' }}>
          <div className="flex-1 flex items-center justify-center min-h-0">
            <nav className="w-full max-w-4xl">
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="menu-link-wrapper block relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="menu-link py-3 md:py-4 lg:py-5 border-b border-gray-900/30 hover:border-gray-700/30 transition-all duration-500">
                    <div className="flex items-center justify-between relative">
                      {/* Main content */}
                      <div className="relative flex-1">
                        {/* Background hover effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                        
                        {/* Text layers */}
                        <div className="relative" style={{ perspective: '1000px' }}>
                          <h3 className="menu-link-text relative text-2xl md:text-3xl lg:text-4xl font-medium text-white transition-all duration-500 group-hover:translate-x-3" style={{ transformStyle: 'preserve-3d', fontWeight: 500 }}>
                            {item.name}
                          </h3>
                          
                          {/* Shadow text */}
                          <h3 className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl font-medium text-orange-400/20 transition-all duration-700 translate-x-0.5 translate-y-0.5 group-hover:translate-x-4 group-hover:translate-y-1" aria-hidden="true">
                            {item.name}
                          </h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-600 mt-1 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-3">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Number and arrow */}
                      <div className="flex items-center gap-4 ml-8">
                        <span className="text-gray-700 text-sm md:text-base font-light transition-all duration-500 group-hover:text-orange-400">
                          0{index + 1}
                        </span>
                        
                        {/* Arrow */}
                        <div className="relative w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                          <svg className="w-full h-full text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className="menu-footer grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-8 border-t border-gray-900/50 text-sm">
            <div className="group">
              <h3 className="text-gray-400 mb-2 text-xs uppercase tracking-wider">Contact</h3>
              <a href="mailto:hello@portfolio.com" className="text-white hover:text-orange-400 transition-colors inline-flex items-center gap-2">
                hello@portfolio.com
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2 text-xs uppercase tracking-wider">Location</h3>
              <p className="text-white">San Francisco, CA</p>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2 text-xs uppercase tracking-wider">Follow</h3>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">TW</a>
                <a href="#" className="text-white hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">LI</a>
                <a href="#" className="text-white hover:text-orange-400 transition-all duration-300 hover:-translate-y-1">GH</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar