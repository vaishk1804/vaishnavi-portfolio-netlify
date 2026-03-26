import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { FiArrowUp } from 'react-icons/fi'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <FiArrowUp />
    </button>
  )
}

function AnimatedOutlet() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState('visible') // 'visible' | 'fading' | 'entering'

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('fading')
    }
  }, [location])

  const handleTransitionEnd = () => {
    if (stage === 'fading') {
      setDisplayLocation(location)
      // scroll to top on route change
      window.scrollTo({ top: 0 })
      setStage('entering')
    } else if (stage === 'entering') {
      setStage('visible')
    }
  }

  return (
    <div
      className={`page-transition page-transition--${stage}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <Outlet key={displayLocation.pathname} />
    </div>
  )
}

function Layout() {
  return (
    <div className="page-shell">
      <ScrollProgress />

      <header className="topbar">
        <div className="container topbar-inner">
          <NavLink to="/" className="brand">
            Vaishnavi Kashyap
          </NavLink>

          <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <AnimatedOutlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Vaishnavi Kashyap</p>
          <div className="footer-links">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  )
}

export default Layout