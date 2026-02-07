import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

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
      </div>
    </motion.section>
  );
}
