import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ViewportReveal from '@/components/ViewportReveal'
import ViewportStagger from '@/components/ViewportStagger'
import HeroReveal from '@/components/HeroReveal'
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll'

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { isScrolling } = useOptimizedScroll()

  useGSAP(() => {
    // Optimized split text animation
    const title = titleRef.current
    if (title) {
      const text = title.innerText
      const chars = text.split('')
      title.innerHTML = chars
        .map(char => `<span class="char-wrapper"><span class="char">${char === ' ' ? '&nbsp;' : char}</span></span>`)
        .join('')

      // Use CSS transforms for better performance
      gsap.set('.char', { 
        yPercent: 110,
        willChange: 'transform'
      })
      
      const tl = gsap.timeline()
      tl.to('.char', {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.01,
        ease: 'power2.out',
        delay: 0.1,
        onComplete: () => {
          gsap.set('.char', { willChange: 'auto' })
        }
      })
    }

    // Remove initial hero animations since ViewportReveal handles them
    // The split text animation for the title still runs

    // Floating animation for hero background
    gsap.to('.hero-float', {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number')
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      const counter = { value: 0 }
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              stat.textContent = Math.round(counter.value).toString()
              if (stat.getAttribute('data-suffix')) {
                stat.textContent += stat.getAttribute('data-suffix')
              }
            }
          })
        },
        once: true
      })
    })

    // Optimized batch animation for service cards
    ScrollTrigger.batch('.service-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { 
            opacity: 0, 
            y: 40,
            willChange: 'transform, opacity'
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: 'auto',
            onComplete: () => {
              gsap.set(elements, { willChange: 'auto' })
            }
          }
        )
      },
      onLeave: (elements) => {
        gsap.set(elements, { opacity: 1, y: 0 })
      },
      onEnterBack: (elements) => {
        gsap.set(elements, { opacity: 1, y: 0 })
      },
      onLeaveBack: (elements) => {
        gsap.set(elements, { opacity: 0, y: 40 })
      },
      start: 'top 85%',
      end: 'bottom 15%'
    })

    // Parallax effects
    gsap.to('.parallax-bg', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // Text reveal animations
    gsap.utils.toArray('.reveal-text').forEach((text: any) => {
      gsap.fromTo(text,
        { 
          opacity: 0,
          y: 50,
          skewY: 5
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
          }
        }
      )
    })

    // Optimized magnetic effect with RAF
    const magneticElements = document.querySelectorAll('.magnetic')
    magneticElements.forEach(el => {
      let rafId: number
      
      const handleMouseMove = (e: MouseEvent) => {
        if (rafId) cancelAnimationFrame(rafId)
        
        rafId = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(el, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        })
      }
      
      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId)
        
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        })
      }
      
      el.addEventListener('mousemove', handleMouseMove as any)
      el.addEventListener('mouseleave', handleMouseLeave)
      
      // Cleanup
      return () => {
        el.removeEventListener('mousemove', handleMouseMove as any)
        el.removeEventListener('mouseleave', handleMouseLeave)
        if (rafId) cancelAnimationFrame(rafId)
      }
    })
  }, { scope: heroRef })

  const services = [
    {
      icon: Zap,
      title: 'Strategy',
      description: 'Digital strategy that aligns with your business goals and drives growth.',
      features: ['Market Research', 'Brand Positioning', 'Growth Planning']
    },
    {
      icon: Sparkles,
      title: 'Design',
      description: 'Beautiful, functional designs that captivate users and enhance experiences.',
      features: ['UI/UX Design', 'Brand Identity', 'Motion Design']
    },
    {
      icon: Target,
      title: 'Development',
      description: 'Robust, scalable solutions built with cutting-edge technologies.',
      features: ['Web Apps', 'Mobile Apps', 'API Development']
    },
    {
      icon: Users,
      title: 'Marketing',
      description: 'Data-driven marketing strategies that connect with your audience.',
      features: ['SEO/SEM', 'Content Strategy', 'Analytics']
    }
  ]

  return (
    <div ref={heroRef} className={`bg-black text-white ${isScrolling ? 'is-scrolling' : ''}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-7xl mx-auto">
          <HeroReveal className="relative z-10" delay={0.2}>
            <h1 
              ref={titleRef}
              className="hero-title text-[clamp(2.5rem,9vw,8rem)] font-semibold leading-[0.9] tracking-tight mb-6"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                overflow: 'hidden',
                display: 'inline-block'
              }}
            >
              Crafting digital experiences
            </h1>
          </HeroReveal>
          
          <HeroReveal className="relative z-10" delay={0.5} yOffset={30}>
            <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-xl mb-10">
              Creating bold digital solutions that push boundaries and drive real business results.
            </p>
          </HeroReveal>

          <HeroReveal className="relative z-10" delay={0.7} yOffset={25}>
            <div className="hero-cta flex flex-wrap gap-6">
              <Link 
                to="/work"
                className="magnetic group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Explore work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/contact"
                className="magnetic group inline-flex items-center gap-2 border border-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-500 hover:bg-white hover:text-black transition-all duration-300"
              >
                Start a project
              </Link>
            </div>
          </HeroReveal>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="hero-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-gray-900">
        <ViewportReveal className="max-w-7xl mx-auto">
          <ViewportStagger className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.05} yOffset={20}>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                <span className="stat-number" data-target="127" data-suffix="+">0</span>
              </div>
              <p className="text-gray-400">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                <span className="stat-number" data-target="98" data-suffix="%">0</span>
              </div>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                <span className="stat-number" data-target="15" data-suffix="+">0</span>
              </div>
              <p className="text-gray-400">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">
                <span className="stat-number" data-target="8" data-suffix="+">0</span>
              </div>
              <p className="text-gray-400">Years Experience</p>
            </div>
          </ViewportStagger>
        </ViewportReveal>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ViewportReveal className="mb-16">
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-6">
              What we do
            </h2>
            <p className="reveal-text text-xl text-gray-400 max-w-3xl">
              We offer a full spectrum of digital services to transform your ideas 
              into impactful digital experiences.
            </p>
          </ViewportReveal>

          <ViewportStagger className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.08} yOffset={25}>
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card group relative bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 hover:border-gray-700/50 transition-all duration-300 hover:bg-gray-900/50 hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-6xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-medium mb-3 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 bg-orange-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/services"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </ViewportStagger>
        </div>
      </section>

      {/* Recent Work Section with Hover Effects */}
      <section className="parallax-section py-24 px-6 md:px-12 lg:px-24 relative">
        <div className="parallax-bg absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <ViewportReveal className="flex justify-between items-end mb-16">
            <div>
              <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-4">Recent Work</h2>
              <p className="reveal-text text-xl text-gray-400">Selected projects we're proud of</p>
            </div>
            <Link 
              to="/work" 
              className="magnetic text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </ViewportReveal>

          <ViewportStagger className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1} yOffset={30}>
            {[
              {
                title: 'Fintech Revolution',
                category: 'Mobile Banking',
                year: '2024',
                color: 'from-blue-600 to-purple-600'
              },
              {
                title: 'E-Commerce Platform',
                category: 'Online Retail',
                year: '2024',
                color: 'from-orange-600 to-red-600'
              },
              {
                title: 'Healthcare Portal',
                category: 'Digital Health',
                year: '2023',
                color: 'from-green-600 to-teal-600'
              },
              {
                title: 'Creative Studio',
                category: 'Agency Website',
                year: '2023',
                color: 'from-purple-600 to-pink-600'
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="project-card group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                <Link to={`/work/${index}`}>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2">
                        View Project <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Project number */}
                    <div className="absolute bottom-4 left-4 text-white/20 text-6xl font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500">{project.category}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{project.year}</span>
                  </div>
                </Link>
              </div>
            ))}
          </ViewportStagger>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <ViewportReveal>
            <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16">
              Our Process
            </h2>
          </ViewportReveal>

          <ViewportStagger className="space-y-16" staggerDelay={0.12} yOffset={35}>
            {[
              {
                phase: 'Discover',
                description: 'Understanding your vision, goals, and challenges through research and strategy.',
                steps: ['Research', 'Strategy', 'Planning']
              },
              {
                phase: 'Design',
                description: 'Creating beautiful, functional designs that resonate with your audience.',
                steps: ['Wireframing', 'UI Design', 'Prototyping']
              },
              {
                phase: 'Develop',
                description: 'Building robust, scalable solutions with clean code and best practices.',
                steps: ['Frontend', 'Backend', 'Testing']
              },
              {
                phase: 'Deploy',
                description: 'Launching your project and ensuring long-term success with support.',
                steps: ['Launch', 'Optimize', 'Support']
              }
            ].map((phase, index) => (
              <div 
                key={index}
                className="reveal-text grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
              >
                <div className="md:col-span-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-bold text-gray-800">
                      0{index + 1}
                    </span>
                    <h3 className="text-3xl font-semibold">{phase.phase}</h3>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <p className="text-gray-400">{phase.description}</p>
                </div>
                <div className="md:col-span-1">
                  <div className="flex gap-3">
                    {phase.steps.map((step, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-gray-900 rounded-lg text-sm text-gray-400"
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ViewportStagger>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold mb-16 text-center">
            Client Love
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Working with this team transformed our digital presence completely. The results exceeded our expectations.",
                author: "Sarah Chen",
                role: "CEO, TechStart",
                rating: 5
              },
              {
                quote: "Their creative approach and technical expertise helped us achieve a 300% increase in conversions.",
                author: "Michael Rodriguez",
                role: "CMO, GrowthCo",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="reveal-text bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-orange-400">★</span>
                  ))}
                </div>
                <blockquote className="text-xl mb-6 text-gray-300">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <ViewportReveal>
            <h2 className="reveal-text text-5xl md:text-8xl font-bold mb-8">
              Let's create something
              <span className="block text-orange-400">extraordinary together</span>
            </h2>
            <p className="reveal-text text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to transform your digital presence? Let's discuss how we can help 
              bring your vision to life.
            </p>
            <Link 
              to="/contact"
              className="magnetic inline-flex items-center gap-3 bg-orange-500 text-black px-10 py-5 rounded-full text-lg font-medium hover:bg-orange-400 transition-all duration-300"
            >
              Start a project <ArrowRight className="w-5 h-5" />
            </Link>
          </ViewportReveal>
        </div>
      </section>
    </div>
  )
}

export default HomePage