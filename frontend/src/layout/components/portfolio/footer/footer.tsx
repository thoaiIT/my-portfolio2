import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Social',
      links: [
        { name: 'GitHub', path: 'https://github.com', external: true },
        { name: 'LinkedIn', path: 'https://linkedin.com', external: true },
        { name: 'Twitter', path: 'https://twitter.com', external: true },
        { name: 'Instagram', path: 'https://instagram.com', external: true },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'hello@portfolio.com', path: 'mailto:hello@portfolio.com', external: true },
        { name: '+1 (234) 567-890', path: 'tel:+1234567890', external: true },
        { name: 'San Francisco, CA', path: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-black border-t border-gray-900 text-white">
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="text-3xl font-bold mb-4 block hover:text-orange-400 transition-colors">
                Portfolio
              </Link>
              <p className="text-gray-400 mb-6">
                Creating bold digital experiences that push boundaries and captivate audiences.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                Let's work together <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Links Columns */}
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-semibold mb-6">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                          {link.name}
                          {link.path.startsWith('http') && (
                            <ArrowUpRight className="w-3 h-3" />
                          )}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-900 pt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
                <p className="text-gray-400">
                  Subscribe to get the latest news and updates.
                </p>
              </div>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-orange-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer