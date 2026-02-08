import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaDiscord, FaSteam } from 'react-icons/fa';

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  url: string;
}

export default function Social() {
  const { t } = useTranslation();

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/warasugitewara' },
    { icon: <FaTwitter />, label: 'X', url: 'https://x.com/Warasg_Parasite' },
    { icon: <FaDiscord />, label: 'Discord', url: 'https://discord.com/users/811515262238064640' },
    { icon: <FaSteam />, label: 'Steam', url: 'https://steamcommunity.com/id/WASG777/' },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="social"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2 variants={itemVariants}>{t('section_social')}</motion.h2>
        
        <div className="social-grid">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              variants={itemVariants}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 255, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-icon">{link.icon}</div>
              <div className="social-label">{link.label}</div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          className="status-display"
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="embeds-container">
            <div className="tool-wrapper">
              <a 
                href="https://github.com/warasugitewara/mouse-wheel-tool" 
                target="_blank" 
                rel="noopener noreferrer"
                className="tool-link"
              >
                <img 
                  src="https://img.shields.io/badge/Mouse%20Wheel%20Tool-v1.0.0-blue?style=for-the-badge&logo=github" 
                  alt="Mouse Wheel Tool"
                  className="tool-badge"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="counter-wrapper">
              <img 
                src="https://count.getloli.com/@warasite?name=warasite&theme=rule34&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" 
                alt="Visitor Counter"
                className="counter-image"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
