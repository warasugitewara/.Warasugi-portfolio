import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Social from './components/Social'
import Footer from './components/Footer'
import './i18n/config' // Initialize i18n
import { useTranslation } from 'react-i18next'
import './components/Header.css'

interface GitHubUser {
  avatar_url: string;
}

function App() {
  const { i18n } = useTranslation()
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  // Fetch GitHub avatar and set favicon
  useEffect(() => {
    const fetchGitHubUser = async () => {
      try {
        const response = await fetch('https://api.github.com/users/warasugitewara')
        const user: GitHubUser = await response.json()
        
        if (user.avatar_url) {
          setAvatarUrl(user.avatar_url)
          
          // Create rounded square favicon from GitHub avatar
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const size = 256
            canvas.width = size
            canvas.height = size
            
            const ctx = canvas.getContext('2d')
            if (ctx) {
              // Draw rounded rectangle
              const radius = 64
              ctx.beginPath()
              ctx.moveTo(radius, 0)
              ctx.lineTo(size - radius, 0)
              ctx.quadraticCurveTo(size, 0, size, radius)
              ctx.lineTo(size, size - radius)
              ctx.quadraticCurveTo(size, size, size - radius, size)
              ctx.lineTo(radius, size)
              ctx.quadraticCurveTo(0, size, 0, size - radius)
              ctx.lineTo(0, radius)
              ctx.quadraticCurveTo(0, 0, radius, 0)
              ctx.closePath()
              ctx.clip()
              
              ctx.drawImage(img, 0, 0, size, size)
              
              // Convert to favicon with caching
              const faviconDataUrl = canvas.toDataURL('image/png')
              const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
              if (favicon) {
                favicon.href = faviconDataUrl
                favicon.type = 'image/png'
                // Cache favicon
                localStorage.setItem('favicon', faviconDataUrl)
              }
            }
          }
          img.src = user.avatar_url
        }
      } catch (error) {
        console.error('Failed to fetch GitHub user:', error)
      }
    }

    fetchGitHubUser()
  }, [])

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
        <Hero avatarUrl={avatarUrl} />
        <About />
        <Projects />
        <Social />
      </main>
      <Footer />
    </div>
  )
}

export default App
