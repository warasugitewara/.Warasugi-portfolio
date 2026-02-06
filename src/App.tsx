import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Social from './components/Social'
import Footer from './components/Footer'
import './i18n/config' // Initialize i18n
import { useTranslation } from 'react-i18next'
import './components/Header.css'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <div className="app">
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }
      `}</style>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Social />
      </main>
      <Footer />
    </div>
  )
}

export default App
