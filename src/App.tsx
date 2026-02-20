import { useEffect, useState } from 'react'
import './App.css'

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
}

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [gitHubUser, setGitHubUser] = useState<GitHubUser | null>(null)

  // Fetch GitHub user data and set favicon
  useEffect(() => {
    const fetchGitHubUser = async () => {
      try {
        const response = await fetch('https://api.github.com/users/warasugitewara')
        const user: GitHubUser = await response.json()
        setGitHubUser(user)
        
        if (user.avatar_url) {
          setAvatarUrl(user.avatar_url)
          
          // Create rounded favicon from GitHub avatar
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const size = 256
            canvas.width = size
            canvas.height = size
            
            const ctx = canvas.getContext('2d')
            if (ctx) {
              // Draw circle
              ctx.beginPath()
              ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
              ctx.clip()
              ctx.drawImage(img, 0, 0, size, size)
              
              const faviconDataUrl = canvas.toDataURL('image/png')
              const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
              if (favicon) {
                favicon.href = faviconDataUrl
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
      <header className="header">
        <div className="header-content">
          <h1>warasugitewara</h1>
          <a href="https://github.com/warasugitewara" target="_blank" rel="noopener noreferrer" className="gh-link">
            GitHub
          </a>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          {avatarUrl && (
            <img src={avatarUrl} alt="Avatar" className="avatar" />
          )}
          <div className="hero-content">
            <h2>{gitHubUser?.name || 'warasugitewara'}</h2>
            <p>{gitHubUser?.bio}</p>
            {gitHubUser?.location && <p className="location">📍 {gitHubUser.location}</p>}
          </div>
        </section>

        <section className="status">
          <h3>Status</h3>
          <div className="status-items">
            <div className="status-item">
              <span className="label">Discord</span>
              <img 
                src="https://lanyard.cnrad.dev/api/811515262238064640?idleMessage=Coding%20or%20Building" 
                alt="Discord Status"
                className="discord-status"
              />
            </div>
            <div className="status-item">
              <span className="label">Visitors</span>
              <img 
                src="https://count.getloli.com/@warasite?name=warasite&theme=rule34&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" 
                alt="Visitor Counter"
                className="visitor-counter"
              />
            </div>
          </div>
        </section>

        <section className="links">
          <h3>Links</h3>
          <nav className="link-list">
            <a href="https://github.com/warasugitewara" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com/warasugitewara" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://discord.com/users/811515262238064640" target="_blank" rel="noopener noreferrer">Discord</a>
          </nav>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 warasugitewara</p>
      </footer>
    </div>
  )
}

export default App
