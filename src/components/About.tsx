import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const skills = [
    { title: t('skill_languages'), items: 'Java, Python, TypeScript, JavaScript, Lua' },
    { title: t('skill_web'), items: 'React, Node.js, Express, HTML/CSS' },
    { title: t('skill_gamedev'), items: 'Minecraft Plugins, Quilt Mods, Paper Server' },
    { title: t('skill_urban'), items: 'Minecraft Urban Planning, 2D City Design' },
  ];

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2 variants={itemVariants}>{t('section_about')}</motion.h2>
        
        <div className="about-grid">
          <motion.div className="about-text" variants={itemVariants}>
            <h3>{t('about_title')}</h3>
            <p>{t('about_desc1')}</p>
            <p>{t('about_desc2')}</p>
          </motion.div>

          <motion.div className="skills-section" variants={itemVariants}>
            <h3>{t('skills_title')}</h3>
            <div className="skills-grid">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="skill-item"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)' }}
                >
                  <h4>{skill.title}</h4>
                  <p>{skill.items}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="status-section" variants={itemVariants}>
            <h3>Status & Visitors</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
              Discord Status and Visitor Counter loaded here
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
