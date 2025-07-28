import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description:
      'A modern e-commerce solution with real-time inventory management',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: null,
    link: '#',
  },
  {
    id: 2,
    title: 'Healthcare Dashboard',
    category: 'UI/UX Design',
    description: 'Patient management system with analytics and reporting',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Chart.js'],
    image: null,
    link: '#',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure banking application with biometric authentication',
    technologies: ['React Native', 'GraphQL', 'AWS', 'Face ID'],
    image: null,
    link: '#',
  },
  {
    id: 4,
    title: 'AI Content Generator',
    category: 'AI/ML',
    description: 'Automated content creation tool powered by machine learning',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI'],
    image: null,
    link: '#',
  },
];

const WorkPage = () => {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Selected Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of projects that showcase my expertise in web
            development, design, and problem-solving. Each project represents a
            unique challenge and innovative solution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={project.link} className="block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden order-2 lg:order-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-muted-foreground/20">
                        {project.title}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="order-1 lg:order-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      {project.category}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-muted rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Have a project in mind?</h3>
          <p className="text-muted-foreground mb-8">
            Let's work together to bring your ideas to life
          </p>
          <Link to="/contact">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Get in Touch
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkPage;
