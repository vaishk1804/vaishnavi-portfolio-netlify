import {
  FiArrowRight,
  FiBarChart2,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMonitor,
  FiServer,
  FiShield,
  FiTrendingUp,
  FiFileText,
  FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const roles = [
  'Full-Stack Engineer',
  'ML Engineer',
  'Data Engineer',
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: <FiMonitor />,
    skills: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'Figma', 'Vite'],
  },
  {
    title: 'Backend',
    icon: <FiServer />,
    skills: ['Python', 'Django', 'DRF', 'FastAPI', 'REST APIs', 'Node.js'],
  },
  {
    title: 'Data / Cloud',
    icon: <FiCloud />,
    skills: ['PostgreSQL', 'SQL Server', 'BigQuery', 'Redis', 'Celery', 'Docker', 'GCP', 'AppSheet'],
  },
  {
    title: 'ML / AI',
    icon: <FiCpu />,
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'ClinicalBERT', 'KeyBERT', 'scikit-learn', 'NLTK', 'spaCy'],
  },
]

const interests = [
  {
    icon: <FiMonitor />,
    title: 'Full-Stack Engineering',
    text: 'Building polished interfaces and dependable backend systems that work well together in real product flows.',
  },
  {
    icon: <FiDatabase />,
    title: 'Data Systems & Analytics',
    text: 'Designing SQL-backed systems, cloud data workflows, dashboards, and decision-support pipelines.',
  },
  {
    icon: <FiCpu />,
    title: 'Machine Learning & NLP',
    text: 'Applying ML and NLP to classification, topic modeling, healthcare text, and analytics tasks.',
  },
  {
    icon: <FiGlobe />,
    title: 'Sustainability Tech',
    text: 'Working on emissions tracking, reporting workflows, forecasting, and operational analytics.',
  },
  {
    icon: <FiShield />,
    title: 'Healthcare Applications',
    text: 'Building healthcare-oriented systems spanning records, workflows, patient experiences, and clinical text.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Productive Engineering',
    text: 'Focusing on maintainability, clean APIs, structured thinking, and genuinely useful product outcomes.',
  },
]

const tickerItems = [
  { icon: '⚡', text: 'Currently building: SEC Filings Copilot — AI-powered financial document explorer' },
  { icon: '🛠', text: 'Stack: FastAPI · Next.js · Docker · Python' },
  { icon: '🔍', text: 'Exploring: RAG pipelines and structured document retrieval' },
  { icon: '📖', text: 'Learning: Advanced async patterns in Python' },
  { icon: '⚡', text: 'Currently building: SEC Filings Copilot — AI-powered financial document explorer' },
  { icon: '🛠', text: 'Stack: FastAPI · Next.js · Docker · Python' },
  { icon: '🔍', text: 'Exploring: RAG pipelines and structured document retrieval' },
  { icon: '📖', text: 'Learning: Advanced async patterns in Python' },
]

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <span style={{ color: 'var(--accent)' }} className="typing-cursor">{displayed}</span>
  )
}

function Home() {
  return (
    <>
      {/* Currently Building Ticker */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-icon">{item.icon}</span>
              {item.text}
              <span className="ticker-sep"> ·· </span>
            </span>
          ))}
        </div>
      </div>

      <section className="hero hero-blue">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">MS Computer Science · UMass Amherst · GPA 4.0</p>

            <h1>
              Building software that is fast, precise, and{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>actually useful</em>.
            </h1>

            <p className="lead">
              I'm Vaishnavi Kashyap — a <TypingRole />{' '}
              with experience across full-stack development, backend systems, cloud data
              workflows, and applied ML. I build products that are technically solid and
              grounded in real outcomes.
            </p>

            <div style={{ marginTop: '1rem' }}>
              <span className="availability-dot">Available for new grad roles · May 2026</span>
            </div>

            <div className="hero-meta">
              <span><FiMapPin /> Amherst, MA</span>
              <a href="mailto:vaishnavikashyap1804@gmail.com">
                <FiMail /> vaishnavikashyap1804@gmail.com
              </a>
            </div>

            {/* Publication highlight */}
            <a
              href="https://www.researchgate.net/publication/363942838"
              target="_blank"
              rel="noreferrer"
              className="pub-card"
            >
              <div className="pub-badge">
                <FiFileText /> IEEE · IGARSS 2022
              </div>
              <p className="pub-title">
                Efficient Use of Interferometric Coherence for Improvement in Classification
                of Urban and Tall Vegetation with SAR Data
              </p>
              <p className="pub-meta">Sentinel-1 SAR · Keras CNN · Remote Sensing · Published &amp; Presented</p>
            </a>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/projects">
                View Projects <FiArrowRight />
              </Link>
              <a className="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
                <FiDownload /> Resume
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">
                <FiGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">
                <FiLinkedin /> LinkedIn
              </a>
              <a href="mailto:vaishnavikashyap1804@gmail.com">
                <FiMail /> Email
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="card floating-card highlight-card">
              <div className="mini-badge">Specializing in</div>
              <h3>Software, data &amp; ML</h3>
              <ul className="feature-list">
                <li>Production-style backend systems &amp; APIs</li>
                <li>Full-stack web applications</li>
                <li>Cloud and SQL-based data workflows</li>
                <li>Applied ML, NLP, and analytics</li>
              </ul>
              <div className="stat-row">
                <div className="stat-item">
                  <span className="stat-value">4.0</span>
                  <span className="stat-label">GPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">1</span>
                  <span className="stat-label">IEEE Publication</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="mini-badge">Core toolkit</div>
              <h3>Tech stack by area</h3>
              <div className="skill-groups">
                {skillGroups.map((group) => (
                  <div key={group.title} className="skill-group-card">
                    <div className="skill-group-header">
                      <span className="skill-group-icon">{group.icon}</span>
                      <h4>{group.title}</h4>
                    </div>
                    <div className="skills-chip-grid">
                      {group.skills.map((skill) => (
                        <span key={skill} className="skill-chip gamified-chip">
                          <FiCode />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">About</p>
            <h2>Engineering with clarity and measurable impact</h2>
            <p className="section-subtitle">
              I like building software that feels thoughtful on the surface and reliable underneath.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-text card">
              <p>
                My work sits at the intersection of software engineering, analytics, and
                machine learning. I've built full-stack applications, API-driven systems,
                cloud-based data workflows, and research-oriented ML projects across
                healthcare, sustainability, finance, and NLP.
              </p>
              <p>
                I'm drawn to roles where I can contribute across architecture, implementation,
                debugging, and product quality — not just writing code, but building systems
                that are genuinely useful and maintainable.
              </p>
            </div>

            <div className="about-list card">
              <h3>Strengths I bring</h3>
              <ul>
                <li>End-to-end thinking across frontend, backend, and data</li>
                <li>Clean API design and structured engineering workflows</li>
                <li>Strong comfort with SQL, cloud tooling, and analytics</li>
                <li>Applied ML experience in NLP, classification, and forecasting</li>
                <li>Translating technical work into real business value</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">What I'm Looking For</p>
            <h2>Where I'd like to contribute next</h2>
            <p className="section-subtitle">
              Roles where engineering quality, product thinking, and data come together.
            </p>
          </div>

          <div className="looking-grid">
            <article className="card looking-card">
              <FiCode className="looking-icon" />
              <h3>Software Engineering</h3>
              <p>Full-stack, backend, and product-oriented roles where I can build robust applications and scalable APIs.</p>
            </article>
            <article className="card looking-card">
              <FiDatabase className="looking-icon" />
              <h3>Data-Driven Products</h3>
              <p>Teams building systems that rely on analytics, workflow automation, SQL, cloud infrastructure, or operational data.</p>
            </article>
            <article className="card looking-card">
              <FiBarChart2 className="looking-icon" />
              <h3>Applied AI / ML</h3>
              <p>Opportunities where ML or NLP supports real products rather than purely experimental work.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">Interests</p>
            <h2>Domains I've worked in</h2>
            <p className="section-subtitle">
              The kinds of products, systems, and problems I'm most drawn to.
            </p>
          </div>

          <div className="interests-grid">
            {interests.map((item) => (
              <article key={item.title} className="card interest-card">
                <div className="interest-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ color: 'var(--text-soft)', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.78, margin: 0 }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home