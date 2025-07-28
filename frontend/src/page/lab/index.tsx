import { motion } from 'framer-motion';
import { ArrowUpRight, Beaker, Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const experiments = [
  {
    title: '3D Text Animation',
    description: 'WebGL-powered 3D text effects with Three.js',
    tags: ['Three.js', 'WebGL', 'GSAP'],
    status: 'live',
    link: '#',
  },
  {
    title: 'AI Image Generator',
    description: 'Text-to-image generation using Stable Diffusion API',
    tags: ['AI', 'React', 'Node.js'],
    status: 'beta',
    link: '#',
  },
  {
    title: 'Particle System',
    description: 'Interactive particle effects with Canvas API',
    tags: ['Canvas', 'JavaScript', 'Physics'],
    status: 'live',
    link: '#',
  },
  {
    title: 'Voice-Controlled UI',
    description: 'Experimental voice commands for web navigation',
    tags: ['Web Speech API', 'React', 'NLP'],
    status: 'development',
    link: '#',
  },
  {
    title: 'Generative Art',
    description: 'Algorithmic art creation with p5.js',
    tags: ['p5.js', 'Creative Coding', 'Math'],
    status: 'live',
    link: '#',
  },
  {
    title: 'AR Business Card',
    description: 'Augmented reality business card experience',
    tags: ['AR.js', 'Three.js', 'WebXR'],
    status: 'beta',
    link: '#',
  },
];

const LabPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'beta':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'development':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Beaker className="w-6 h-6 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">The Lab</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            A playground for creative experiments, cutting-edge technologies,
            and wild ideas. This is where I push boundaries and explore the
            future of web experiences.
          </p>
        </motion.div>

        {/* Featured Experiment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 p-8 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-lg border border-gray-800"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-orange-400 font-medium">
              Featured Experiment
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Neural Network Visualizer</h2>
          <p className="text-gray-400 mb-6">
            An interactive visualization of how neural networks learn and make
            decisions in real-time.
          </p>
          <Link
            to="#"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            Explore <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <Code className="w-5 h-5 text-gray-600" />
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(experiment.status)}`}
                >
                  {experiment.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                {experiment.title}
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                {experiment.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {experiment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={experiment.link}
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors"
              >
                View Experiment <ArrowUpRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center p-12 bg-gray-900/30 rounded-lg border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-4">
            Have an idea for an experiment?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always looking for new technologies to explore and creative
            challenges to tackle. Let's collaborate on something innovative.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-orange-500 text-black px-8 py-4 rounded-full font-medium hover:bg-orange-400 transition-all duration-300"
          >
            Share Your Idea
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LabPage;
