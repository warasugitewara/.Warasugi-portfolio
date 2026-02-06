import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">&lt; .warasugi /&gt;</span>
        </div>
        <nav className="nav-right">
          <div className="lang-buttons">
            {['ja', 'en', 'ar'].map((lng) => (
              <motion.button
                key={lng}
                className={`lang-btn ${i18n.language === lng ? 'active' : ''}`}
                onClick={() => changeLanguage(lng)}
                whileHover={{ scale: 1.1, textShadow: '0 0 20px #ff00ff' }}
                whileTap={{ scale: 0.95 }}
              >
                {lng === 'ja' ? '日本語' : lng === 'en' ? 'English' : 'العربية'}
              </motion.button>
            ))}
          </div>
          <motion.a
            href="https://github.com/warasugitewara"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            whileHover={{ scale: 1.2, boxShadow: '0 0 20px #00ff00' }}
            whileTap={{ scale: 0.95 }}
            title="GitHub"
          >
            <FaGithub size={24} />
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
}
