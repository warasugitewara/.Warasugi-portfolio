import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const LANGUAGES = [
  { code: 'ja', name: 'Japanese', localName: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', localName: '英語', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', localName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', localName: '中文', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', localName: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Spanish', localName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', localName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', localName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', localName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', localName: 'Português', flag: '🇵🇹' },
  { code: 'lv', name: 'Latvian', localName: 'Latviešu', flag: '🇱🇻' },
];

export default function Header() {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsDropdownOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language);

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
          <div className="lang-selector">
            <motion.button
              className="lang-dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="lang-flag">{currentLang?.flag}</span>
              <span className="lang-label">{currentLang?.name} ({currentLang?.localName})</span>
              <FaChevronDown 
                size={12} 
                style={{ 
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="lang-dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {LANGUAGES.map((lng) => (
                    <motion.button
                      key={lng.code}
                      className={`lang-dropdown-item ${i18n.language === lng.code ? 'active' : ''}`}
                      onClick={() => changeLanguage(lng.code)}
                      whileHover={{ backgroundColor: 'rgba(255, 0, 255, 0.1)' }}
                    >
                      <span className="lang-flag">{lng.flag}</span>
                      <span className="lang-name">{lng.name} ({lng.localName})</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
