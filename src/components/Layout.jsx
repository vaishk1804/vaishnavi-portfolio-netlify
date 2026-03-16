import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <NavLink to="/" className="brand">
            Vaishnavi Kashyap
          </NavLink>

          <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Vaishnavi Kashyap</p>
          <div className="footer-links">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vaishnavikashyap2001"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout