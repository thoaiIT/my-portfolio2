import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'GraphQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
  },
];

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description:
      'Writing maintainable, scalable, and efficient code is my priority.',
  },
  {
    icon: Palette,
    title: 'Design Thinking',
    description:
      'Combining aesthetics with functionality for optimal user experience.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Always exploring new technologies and creative solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working effectively with teams to achieve common goals.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with a keen eye for design
                and a love for creating digital experiences that make a
                difference. With over 5 years of experience in web development,
                I specialize in building modern, performant applications that
                solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground">
                My journey began with a curiosity about how things work on the
                web, and has evolved into a career focused on pushing the
                boundaries of what's possible in digital innovation. I believe
                in continuous learning and staying at the forefront of
                technology trends.
              </p>
            </div>
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-background rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12">What I Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {[
              {
                year: '2023 - Present',
                title: 'Senior Full Stack Developer',
                company: 'Tech Innovations Inc.',
                description:
                  'Leading development of enterprise web applications using React and Node.js.',
              },
              {
                year: '2021 - 2023',
                title: 'Full Stack Developer',
                company: 'Digital Solutions Ltd.',
                description:
                  'Built and maintained multiple client projects using modern web technologies.',
              },
              {
                year: '2019 - 2021',
                title: 'Frontend Developer',
                company: 'Creative Agency',
                description:
                  'Focused on creating responsive and interactive user interfaces.',
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 w-32 text-sm text-muted-foreground">
                  {exp.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-primary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
