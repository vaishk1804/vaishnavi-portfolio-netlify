import { useState, useEffect } from 'react'

const NAV_LINKS = ['About', 'Impact', 'Domains', 'Experience', 'Projects', 'Contact']
const METRICS = [
  { value: '300+', label: 'Users in production' },
  { value: '1M+', label: 'Daily data points' },
  { value: '99.9%', label: 'Uptime sustained' },
  { value: '5+', label: 'Sites digitized' },
  { value: '90%', label: 'Efficiency gain' },
  { value: '70%', label: 'Query time cut' },
  { value: '4.0', label: 'GPA · UMass' },
  { value: '1', label: 'IEEE publication' },
  { value: '+30%', label: 'Class balance' },
  { value: '+15%', label: 'Model accuracy' },
]

const DOMAINS = [
  {
    icon: '⬡',
    title: 'Full-Stack Engineering',
    text: 'End-to-end systems across React, Angular, Django, FastAPI, and Node.js — from schema design to deployment, owned in production.',
  },
  {
    icon: '◈',
    title: 'Data Systems & Analytics',
    text: 'BigQuery pipelines, PostgreSQL schemas, dashboards, and cloud data workflows processing 1M+ records in real time.',
  },
  {
    icon: '◎',
    title: 'Machine Learning & NLP',
    text: 'Transformer-based classification, LLM-driven augmentation, CNNs, ARIMA forecasting — research-grade and applied.',
  },
  {
    icon: '◉',
    title: 'Sustainability Tech',
    text: 'Carbon emissions tracking, Scope 1 reporting, geospatial mapping with Earth Engine, and operational KPI forecasting.',
  },
  {
    icon: '⬟',
    title: 'Healthcare Applications',
    text: 'Medical transcription classification, appointment systems, records platforms — built across clinical text and workflow domains.',
  },
  {
    icon: '◇',
    title: 'Backend Infrastructure',
    text: 'API design, async task processing with Celery + Redis, Dockerized services, CI/CD pipelines, and production-grade reliability.',
  },
]

const SKILLS = [
  { area: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'] },
  { area: 'Frontend', items: ['React', 'Angular', 'Next.js', 'Tailwind CSS', 'D3.js', 'Chart.js'] },
  { area: 'Backend', items: ['FastAPI', 'Django', 'Node.js', 'DRF', 'Spring Boot', '.NET', 'REST APIs'] },
  { area: 'Data & Cloud', items: ['PostgreSQL', 'BigQuery', 'Redis', 'Celery', 'Docker', 'AWS', 'GCP', 'Vertex AI'] },
  { area: 'ML / AI', items: ['Keras', 'TensorFlow', 'PyTorch', 'ClinicalBERT', 'T5', 'ALBERT', 'GPT-Neo', 'scikit-learn'] },
  { area: 'Tools', items: ['Git', 'GitHub Actions', 'SQLAlchemy', 'Alembic', 'AppSheet', 'Docker', 'JIRA', 'Postman'] },
]

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'Saint Gobain – INDEC',
    period: 'Nov 2023 – Aug 2024',
    location: 'Bangalore, India',
    points: [
      'Architected and owned a React + Django + AWS carbon emissions platform end-to-end — ingesting 10–12 metrics per employee across 300+ users, replacing fragmented spreadsheets with real-time sustainability KPIs.',
      'Led (as primary engineer) a React + Node.js assembly planning system from scratch, digitizing workflows for 100+ workers across 5 factory sites and improving operational efficiency by 90%.',
      'Built an Angular + Django audit system eliminating ~1-week paper cycles across 5+ manufacturing sites, digitizing 100% of factory audits to near real-time turnaround.',
      'Designed PostgreSQL schema from scratch; sustained 99.9% uptime across 3+ concurrent projects through query optimization and proactive infrastructure tuning.',
      'Extended a React + .NET + SQL Server platform with Chart.js and D3.js dashboards, surfacing automobile feature trend insights for business stakeholders.',
      'Configured GitHub Actions CI/CD pipelines; built a 3D Unity fire drill simulator using real factory floor plans for emergency preparedness.',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'CloudSufi',
    period: 'Jun 2022 – Aug 2022',
    location: 'Remote',
    points: [
      'Presented ML forecasts and geospatial emission maps directly to the CEO and full ML team — fusing Google Earth Engine data with 1M+ emission records to produce location-specific insights.',
      'Owned the full ARIMA forecasting pipeline on Vertex AI — data ingestion, training, deployment, and dashboard integration — predicting Scope 1 emission trends across 1M+ records.',
      'Authored BigQuery SQL views with multi-table joins and rolling 2-week windows, surfacing 1M+ daily data points in real time and cutting analyst query time by 70%.',
      'Built 6+ live AppSheet dashboards connected directly to BigQuery, enabling non-technical ops teams to self-serve Scope 1 emissions data.',
    ],
  },
]

const PROJECTS = [
  {
    title: 'Medical Transcription Classification',
    tag: 'NLP · Healthcare AI · LLMs',
    featured: true,
    description: 'Used ClinicalBERT, ALBERT, T5, and GPT-Neo to generate synthetic training data on the MTTranscripts dataset, improving minority class representation by 30%. CNN and CNN+BiLSTM classifiers improved accuracy by 15% over baseline.',
    stack: ['ClinicalBERT', 'ALBERT', 'T5', 'GPT-Neo', 'CNN', 'BiLSTM', 'Keras'],
    metrics: ['+30% class balance', '+15% accuracy'],
    link: 'https://github.com/vaishk1804/LLM-based_Medical_Transcription_Classification',
  },
  {
    title: 'SAR Land-Cover Classification',
    tag: 'Computer Vision · IEEE IGARSS 2022',
    featured: true,
    description: 'CNN pipeline for 6-class land-cover classification over 200 ROIs/class from Sentinel-1 SAR imagery. Interferometric coherence improved overall accuracy by 11% and urban/vegetation class accuracy by 15–25%. Published at IEEE IGARSS 2022.',
    stack: ['Keras', 'TensorFlow', 'OpenCV', 'Rasterio', 'SNAP', 'Sentinel-1'],
    metrics: ['+11% accuracy', 'IEEE published', '200 ROIs/class'],
    link: 'https://www.researchgate.net/publication/363942838',
  },
  {
    title: 'AirWatch',
    tag: 'Backend · Data Engineering',
    featured: false,
    description: 'Full-stack air quality platform consuming live OpenAQ API feeds. FastAPI + PostgreSQL backend with Alembic migrations. Async task processing via Celery + Redis. All services containerized with Docker.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
    metrics: ['Live OpenAQ data', 'Fully containerized'],
    link: 'https://github.com/vaishk1804/airwatch',
  },
  {
    title: 'Healthcare Management System',
    tag: 'Full-Stack · Healthcare',
    featured: false,
    description: 'Full appointment and medical records platform with Google OAuth 2.0, role-based access control, and optimized DRF REST APIs handling concurrent booking flows.',
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Google OAuth 2.0'],
    metrics: ['Role-based access', 'Concurrent booking'],
    link: 'https://github.com/vaishk1804/Apollo-healthcare',
  },
  {
    title: 'Healthcare Topic Modeling',
    tag: 'NLP · Analytics',
    featured: false,
    description: 'NLP pipeline using LDA, KeyBERT, and TF-IDF to mine 100+ healthcare research papers into interpretable topic clusters across Healthcare 4.0 domains.',
    stack: ['Python', 'LDA', 'KeyBERT', 'TF-IDF', 'scikit-learn', 'NLTK'],
    metrics: ['100+ papers analyzed'],
    link: 'https://github.com/vaishk1804/Healthcare_Topic_Modelling',
  },
  {
    title: 'Earnings Fraud Detection',
    tag: 'ML · Finance',
    featured: false,
    description: 'Fraud-detection workflow classifying earnings manipulation signals from structured financial data using interpretable, feature-driven classification.',
    stack: ['Python', 'Pandas', 'scikit-learn'],
    metrics: [],
    link: 'https://github.com/vaishk1804/Earnings-fraud-detection',
  },
]

const TICKER_ITEMS = [
  '⚡ Shipped to 300+ users at Saint Gobain — React · Django · AWS · PostgreSQL',
  '◎ IEEE published — SAR Land-Cover Classification · IGARSS 2022',
  '🛠 Building: SEC Filings Copilot — FastAPI · Next.js · Docker · RAG pipelines',
  '📖 Exploring: async Python patterns · structured document retrieval',
]

function useScrollSpy() {
  const [active, setActive] = useState('About')
  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 120
      let cur = 'About'
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id.toLowerCase())
        if (el && y >= el.offsetTop) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return active
}

const go = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => <span key={i} className="ticker-item">{t}<span className="ticker-sep"> · </span></span>)}
      </div>
    </div>
  )
}

function Nav() {
  const active = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container"><div className="nav-inner">
        <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Vaishnavi Kashyap</button>
        <nav className="nav-links">
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link${active === l ? ' active' : ''}`} onClick={() => go(l)}>{l}</button>
          ))}
        </nav>
        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
        <button className="nav-burger" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-mob-link" onClick={() => { go(l); setOpen(false) }}>{l}</button>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-grid-lines" />
      <div className="hero-glow" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="pulse-dot" />
            Open to new grad roles · July 2026 · MA
          </div>
          <h1 className="hero-h1">
            I build systems that<br />
            <span className="hero-accent">ship, scale,</span><br />
            and hold up.
          </h1>
          <p className="hero-lead">
            Pursuing an M.S. in CS at UMass Amherst (GPA 4.0). I've shipped
            production software to 300+ users across 5 factory sites, processed
            1M+ daily data points, and published ML research at IEEE.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => go('Projects')}>View Projects</button>
            <a className="btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume ↓</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email ↗</a>
          </div>
        </div>

        <div className="hero-cards">
          <div className="hcard hcard-photo">
            <img src="/profile.jpg" alt="Vaishnavi Kashyap" className="hero-photo-lg" />
            <div className="hero-photo-name">Vaishnavi Kashyap</div>
            <div className="hero-photo-role">Full-Stack Engineer <span className="hero-role-dim">· ML depth</span></div>
          </div>
          <div className="hcard hcard-main">
            <div className="hcard-eyebrow">Currently at</div>
            <div className="hcard-title">UMass Amherst</div>
            <div className="hcard-sub">M.S. Computer Science · GPA 4.0 · May 2026</div>
            <div className="hcard-rule" />
            <div className="hcard-eyebrow">Published at</div>
            <div className="hcard-pub">
              <span className="ieee-badge">IEEE</span>
              <span>SAR Land-Cover Classification · IGARSS 2022</span>
            </div>
          </div>
          <div className="hcard hcard-stack">
            <div className="hcard-eyebrow">Core stack</div>
            <div className="hcard-chips">
              {['React', 'FastAPI', 'Django', 'PostgreSQL', 'Docker', 'GCP', 'Keras', 'TypeScript'].map(s => (
                <span key={s} className="hchip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section id="impact" className="impact">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">By the numbers</span>
          <h2>Production impact, not just projects</h2>
        </div>
        <div className="metrics">
          {METRICS.map(m => (
            <div key={m.label} className="metric">
              <div className="metric-val">{m.value}</div>
              <div className="metric-lbl">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="skills-table">
          {SKILLS.map(g => (
            <div key={g.area} className="skill-row">
              <div className="skill-area">{g.area}</div>
              <div className="skill-pills">
                {g.items.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function Domains() {
  return (
    <section id="domains" className="domains">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Areas of focus</span>
          <h2>Domains I work in</h2>
        </div>
        <div className="domains-grid">
          {DOMAINS.map(d => (
            <div key={d.title} className="domain-card">
              <div className="domain-icon">{d.icon}</div>
              <h3 className="domain-title">{d.title}</h3>
              <p className="domain-text">{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="exp">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Where I've worked</span>
          <h2>Experience</h2>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className="exp-row">
              <div className="exp-meta-col">
                <div className="exp-role">{job.role}</div>
                <div className="exp-co">{job.company}</div>
                <div className="exp-period">{job.period}</div>
                <div className="exp-loc">{job.location}</div>
              </div>
              <ul className="exp-points">
                {job.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          ))}
          <div className="exp-row exp-row--edu">
            <div className="exp-meta-col">
              <div className="exp-role">M.S. Computer Science</div>
              <div className="exp-co">UMass Amherst</div>
              <div className="exp-period">Sep 2024 – May 2026</div>
            </div>
            <div className="exp-edu-body">
              <p>GPA 4.0. Coursework: Neural Networks, Information Retrieval, System Design, Software Engineering, Computer Networks &amp; Security, Cryptography, Computer Architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const [filter, setFilter] = useState('all')
  const catMap = {
    'Medical Transcription Classification': ['ml', 'nlp'],
    'SAR Land-Cover Classification': ['ml'],
    'AirWatch': ['fullstack'],
    'Healthcare Management System': ['fullstack'],
    'Healthcare Topic Modeling': ['nlp', 'ml'],
    'Earnings Fraud Detection': ['ml'],
  }
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => (catMap[p.title] || []).includes(filter))
  const featured = visible.filter(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2>Projects</h2>
        </div>
        <div className="filter-bar">
          {[['all', 'All'], ['ml', 'ML / AI'], ['nlp', 'NLP'], ['fullstack', 'Full-Stack']].map(([k, l]) => (
            <button key={k} className={`filter-btn${filter === k ? ' active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>
        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map(p => (
              <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="proj-featured">
<div className="pf-tag">{p.tag}</div>
                <h3 className="pf-title">{p.title}</h3>
                <p className="pf-desc">{p.description}</p>
                {p.metrics.length > 0 && (
                  <div className="pf-metrics">{p.metrics.map(m => <span key={m} className="pf-metric">{m}</span>)}</div>
                )}
                <div className="pf-stack">{p.stack.map(s => <span key={s} className="pf-chip">{s}</span>)}</div>
                <div className="pf-cta">View on GitHub ↗</div>
              </a>
            ))}
          </div>
        )}
        {rest.length > 0 && (
          <div className="proj-grid">
            {rest.map(p => (
              <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="proj-card">
                <div className="pc-tag">{p.tag}</div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-desc">{p.description}</p>
                {p.metrics.length > 0 && (
                  <div className="pc-metrics">{p.metrics.map(m => <span key={m} className="pc-metric">{m}</span>)}</div>
                )}
                <div className="pc-stack">
                  {p.stack.slice(0, 4).map(s => <span key={s} className="pc-chip">{s}</span>)}
                  {p.stack.length > 4 && <span className="pc-chip pc-more">+{p.stack.length - 4}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Contact() {
  const EMAIL = 'vaishnavikashyap1804@gmail.com'
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-copy">
            <span className="eyebrow">Get in touch</span>
            <h2>Let's build something.</h2>
            <p className="contact-body">
              Actively seeking new grad software engineering and ML engineering roles for 2026.
              Open to full-stack, backend, and applied AI/ML opportunities across the U.S.
            </p>
            <div className="email-row">
              <span className="email-addr">{EMAIL}</span>
              <button className="copy-btn" onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <div className="contact-links">
              <a className="cl cl--primary" href={`mailto:${EMAIL}`}>Email me</a>
              <a className="cl" href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="cl" href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="cl" href="/resume.pdf" target="_blank" rel="noreferrer">Resume ↗</a>
            </div>
          </div>
          <div className="contact-stats">
            {[['July 2026', 'Available from'], ['U.S. only', 'Work authorization'], ['4.0 GPA', 'UMass MSCS']].map(([v, l]) => (
              <div key={l} className="cstat">
                <div className="cstat-v">{v}</div>
                <div className="cstat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return show ? (
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  ) : null
}

export default function App() {
  return (
    <>
      <Ticker />
      <Nav />
      <main>
        <Hero />
        <Impact />
        <Domains />
        <ExperienceSection />
        <ProjectsSection />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Vaishnavi Kashyap</span>
          <div className="footer-links">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email</a>
          </div>
        </div>
      </footer>
      <ScrollTop />
    </>
  )
}