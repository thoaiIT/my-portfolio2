import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
} from 'lucide-react';

const skills = [
  {
    category: 'Frontend Development',
    icon: Globe,
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'GSAP', level: 75 },
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    category: 'Database',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 70 },
      { name: 'MySQL', level: 85 },
    ],
  },
  {
    category: 'Mobile Development',
    icon: Smartphone,
    skills: [
      { name: 'React Native', level: 75 },
      { name: 'Flutter', level: 60 },
      { name: 'iOS/Android', level: 65 },
    ],
  },
  {
    category: 'Design',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 70 },
      { name: 'UI/UX Design', level: 80 },
    ],
  },
  {
    category: 'Other',
    icon: Code2,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 80 },
    ],
  },
];

const PortfolioSkillsPage = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            A comprehensive overview of my technical skills and proficiencies
            across various domains of software development and design.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Looking for specific expertise?
          </h2>
          <p className="text-gray-400 mb-8">
            Let's discuss how my skills can contribute to your project
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-orange-500 text-black px-8 py-4 rounded-full font-medium hover:bg-orange-400 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioSkillsPage;
