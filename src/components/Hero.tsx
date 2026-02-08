import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Header.css';

interface HeroProps {
  avatarUrl?: string;
}

export default function Hero({ avatarUrl }: HeroProps) {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const glitchVariants = {
    animate: {
      textShadow: [
        '0 0 10px #00ff00, 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff',
        '0 0 10px #00ff00, -2px -2px 0px #ff00ff, 2px 2px 0px #00ffff',
        '0 0 10px #00ff00, 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff',
      ],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <motion.section
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-grid">
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            .Warasugi
          </motion.h1>

          <motion.div
            className="hero-subtitle"
            variants={glitchVariants}
            animate="animate"
          >
            {t('hero_subtitle')}
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            {t('hero_description')}
          </motion.p>

          <motion.div className="cta-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00ff00' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('btn_projects')}
            </motion.button>
            <motion.a
              href="#social"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #ff00ff' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('btn_connect')}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" variants={itemVariants}>
          <div className="avatar-container">
            <motion.div
              className="avatar"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="GitHub Avatar" 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              ) : (
                '💡'
              )}
            </motion.div>
            <div className="avatar-glow" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
