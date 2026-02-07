import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  descKey: string;
  tags: string[];
  url: string;
}

export default function Projects() {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      title: 'Arabic Translator MC Plugin',
      descKey: 'proj_arabic_desc',
      tags: ['Java', 'Minecraft', 'Plugin'],
      url: 'https://github.com/warasugitewara/arabic-translator-MCplugin',
    },
    {
      title: 'Discord Chat Relay',
      descKey: 'proj_discord_desc',
      tags: ['Java', 'Minecraft', 'Discord'],
      url: 'https://github.com/warasugitewara/discord-chat-relay',
    },
    {
      title: 'FitnessBot Discord',
      descKey: 'proj_fitness_desc',
      tags: ['Java', 'Discord', 'Bot'],
      url: 'https://github.com/warasugitewara/FitnessBot-Discord',
    },
    {
      title: 'Shell Music Controller',
      descKey: 'proj_shell_desc',
      tags: ['Lua', 'CLI', 'Music'],
      url: 'https://github.com/warasugitewara/Shell-music-controller',
    },
    {
      title: 'Easy Cities 2D',
      descKey: 'proj_cities_desc',
      tags: ['TypeScript', 'Cities', 'Simulator'],
      url: 'https://github.com/warasugitewara/easy-cities-2d',
    },
    {
      title: 'MuseHeart Music Bot',
      descKey: 'proj_muse_desc',
      tags: ['Python', 'Discord', 'Music'],
      url: 'https://github.com/warasugitewara/MuseHeart-MusicBot',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2 variants={itemVariants}>{t('section_projects')}</motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.4)',
              }}
            >
              <h3>{project.title}</h3>
              <p>{t(project.descKey as any)}</p>
              <div className="project-tags">
                {project.tags.map((tag, tidx) => (
                  <motion.span
                    key={tidx}
                    className="tag"
                    whileHover={{ scale: 1.1, background: 'rgba(0, 255, 136, 0.3)' }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ x: 5 }}
              >
                {t('view_github')}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
