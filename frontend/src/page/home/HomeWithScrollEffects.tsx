import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxSection from '@/components/ParallaxSection'
import ScrollBackEffect from '@/components/ScrollBackEffect'
import { useScrollDirection } from '@/hooks/useScrollDirection'

gsap.registerPlugin(ScrollTrigger)

// Example of how to use the scroll effects components
const HomePageWithScrollEffects = () => {
  const { isScrollingUp } = useScrollDirection()
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Parallax */}
      <ParallaxSection speed={0.5} className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <ScrollReveal animation="fade" duration={1.2}>
            <h1 className="text-6xl font-bold mb-4">Welcome to My Portfolio</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide" direction="up" delay={0.3}>
            <p className="text-xl text-gray-400">Creating amazing digital experiences</p>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* About Section with Scroll Back Effect */}
      <ScrollBackEffect 
        className="py-20 px-6"
        blurAmount={3}
        scaleAmount={0.98}
        rotateAmount={1}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="slide" direction="left">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade" delay={0.2}>
              <p className="text-gray-300">
                I'm a passionate developer focused on creating beautiful and functional web experiences.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="scale" delay={0.4}>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-2xl mb-4">Skills</h3>
                <ul className="space-y-2">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>GSAP Animations</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollBackEffect>

      {/* Services Section with Stagger Effect */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="fade">
            <h2 className="text-4xl font-bold mb-12 text-center">Services</h2>
          </ScrollReveal>
          
          <ScrollReveal animation="slide" direction="up" stagger={0.2}>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: 'Web Design', desc: 'Beautiful, modern designs' },
                { icon: Zap, title: 'Development', desc: 'Fast, scalable applications' },
                { icon: Target, title: 'SEO', desc: 'Optimized for search engines' }
              ].map((service, index) => (
                <ScrollBackEffect 
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                  blurAmount={2}
                  scaleAmount={0.95}
                >
                  <service.icon className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </ScrollBackEffect>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Section with Advanced Scroll Effects */}
      <ParallaxSection speed={0.3} className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="rotate" direction="right">
            <h2 className="text-4xl font-bold mb-12 text-center">Recent Work</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <ScrollReveal 
                key={item}
                animation="slide" 
                direction={item % 2 === 0 ? 'left' : 'right'}
                delay={item * 0.1}
              >
                <ScrollBackEffect
                  className="group relative overflow-hidden rounded-lg"
                  blurAmount={5}
                  scaleAmount={0.9}
                  fadeAmount={0.7}
                >
                  <div className="aspect-video bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-700">Project {item}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 p-6">
                        <h3 className="text-xl font-bold mb-2">Project Title {item}</h3>
                        <p className="text-gray-300">Project description goes here</p>
                      </div>
                    </div>
                  </div>
                </ScrollBackEffect>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <ScrollBackEffect className="py-20 px-6" rotateAmount={3}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="scale">
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-gray-400 mb-8">
              Ready to start your next project?
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </ScrollBackEffect>

      {/* Scroll indicator that shows when scrolling up */}
      {isScrollingUp && (
        <div className="fixed bottom-8 right-8 bg-white text-black px-4 py-2 rounded-full animate-pulse">
          Scrolling Up ↑
        </div>
      )}
    </div>
  )
}

export default HomePageWithScrollEffects