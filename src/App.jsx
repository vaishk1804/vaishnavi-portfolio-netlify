import { useState, useEffect } from 'react'

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Impact', 'Contact']

const METRICS = [
  { value: '300+', label: 'Users on my carbon platform' },
  { value: '99.9%', label: 'Uptime sustained' },
  { value: '5', label: 'Factory sites served' },
  { value: '~90%', label: 'Efficiency gain (mgmt-assessed)' },
  { value: '<100ms', label: 'Query time, down from 3–4 s' },
  { value: '70%', label: 'BigQuery query time cut' },
  { value: '1M+', label: 'Records modeled · CloudSufi' },
  { value: '230 RPS', label: 'AirWatch at 0% errors (was 63)' },
  { value: '4.0', label: 'GPA · UMass M.S. CS' },
  { value: '1', label: 'IEEE publication' },
]

const SKILLS = [
  { area: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Bash'] },
  { area: 'Frontend', items: ['React', 'React Native', 'Expo', 'Angular', 'Three.js', 'Tailwind CSS'] },
  { area: 'Backend', items: ['FastAPI', 'Django', 'DRF', 'Node.js', 'SQLAlchemy', 'Alembic', 'Celery', 'REST APIs'] },
  { area: 'Data & Cloud', items: ['PostgreSQL', 'BigQuery', 'Redis', 'Kafka', 'Airflow', 'dbt', 'Docker', 'AWS (EC2, S3, CloudWatch)', 'GCP Vertex AI', 'GitHub Actions'] },
  { area: 'AI / ML', items: ['Anthropic SDK', 'Tool-using agents', 'RAG (BM25 + dense)', 'Embedding fine-tuning', 'ClinicalBERT', 'ALBERT', 'Keras', 'TensorFlow', 'ARIMA', 'Pandas', 'NumPy'] },
]

const EXPERIENCE = [
  {
    role: 'Office & Technology Operations Intern',
    company: 'Boomerroomers',
    period: 'Aug 2026 – Present',
    location: 'Remote',
    points: [
      'Full-stack development on the Boomerroomers mobile app — React Native / Expo frontend and Node.js backend — targeting an iOS launch.',
      'Ship features through code-reviewed pull requests, working directly with the company founder.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Saint-Gobain – INDEC',
    period: 'Nov 2023 – Aug 2024',
    location: 'Mumbai, India',
    points: [
      'One of two engineers delivering three concurrent internal systems for 5 glass-factory sites.',
      'Proposed and built a carbon emissions platform (React + Django) on my own initiative — tracking water, travel, food, and energy with GHG Protocol factors and Scope 1/3 dashboards for 300+ users at 99.9% uptime.',
      'Deployed it myself on AWS: EC2 behind Gunicorn, S3 signed-URL report exports, and CloudWatch log streaming with instance-health alerts.',
      'Added a composite index that cut a slow query from 3–4 s to under 100 ms.',
      'Built an Angular + Django factory audit system on a state machine in about 6 weeks, replacing week-long paper audits with near real-time turnaround.',
      'Built an assembly floor planner (React + Node.js + Three.js) used by 100+ workers; management assessed a ~90% efficiency improvement.',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'CloudSufi',
    period: 'Jun 2022 – Aug 2022',
    location: 'Remote',
    points: [
      'Built an ARIMA emissions forecasting pipeline on GCP Vertex AI over 1M+ records with weather covariates, writing forecasts to BigQuery.',
      'Wrote BigQuery SQL views with multi-table joins and rolling windows, cutting query time by 70%.',
      'Connected AppSheet dashboards to the BigQuery forecasts so non-technical ops teams could self-serve emissions data.',
      'Presented forecasting results directly to the CEO.',
    ],
  },
]

// link: '' renders the card without a link. Fill these in once the repos are public and current.
const PROJECTS = [
  {
    title: 'LexRAG',
    tag: 'RAG · Retrieval · Legal NLP',
    featured: true,
    problem: 'Contracts bury the clauses that matter in long, formulaic text. Keyword search misses paraphrased clauses; embedding search alone misses exact legal terms.',
    solution: 'Retrieval system over 510 CUAD contracts combining BM25 and dense retrieval with Reciprocal Rank Fusion, plus a fine-tuned embedding model.',
    decision: 'Hybrid retrieval — BM25 and dense results fused with RRF — then fine-tuned the embedding model, lifting top-1 retrieval from 3.5% to 8.0%.',
    stack: ['Python', 'BM25', 'Dense retrieval', 'RRF', 'Embedding fine-tuning'],
    metrics: ['510 CUAD contracts', 'Top-1 retrieval 3.5% → 8.0%'],
    link: '', // TODO: LexRAG repo URL
  },
  {
    title: 'PitWall F1 Agent',
    tag: 'LLM Agent · Tool Use · Evals',
    featured: true,
    problem: 'LLM agents answering factual questions can state wrong numbers with full confidence — and without evals you cannot tell whether a fix helped.',
    solution: 'Formula 1 agent built on the Anthropic SDK with 8 tools and confidence guardrails, backed by an eval harness and test suite.',
    decision: 'Built the eval harness (10 cases across 9 categories) alongside the agent, so guardrail changes are tested rather than guessed. The confidence guardrails reduce hallucination risk.',
    stack: ['Anthropic SDK', 'Tool use', 'Guardrails', 'Eval harness'],
    metrics: ['8 tools', '10-case eval harness', '66 tests'],
    link: '', // TODO: push harness + tests, then add repo URL
  },
  {
    title: 'AirWatch',
    tag: 'Full-Stack · Data Engineering · APIs',
    featured: true,
    problem: 'Synchronous fetch pipelines break whenever the external API is slow — making real-time air quality dashboards fragile under load.',
    solution: 'Decoupled ingestion from the request cycle with Celery + Redis. FastAPI serves pre-ingested data from PostgreSQL to a React + TypeScript frontend. Containerized with Docker; GitHub Actions CI runs lint, typecheck, tests, and the Docker build.',
    decision: 'Celery over a background thread — thread-based ingestion dies silently on restart. Under 100 concurrent clients, throughput went from 63 RPS at 74% errors to 230 RPS at 0% errors.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis', 'Docker', 'GitHub Actions'],
    metrics: ['230 RPS · 0% errors', 'p95 736 ms', '100 concurrent clients', '27 tests'],
    link: 'https://github.com/vaishk1804/airwatch',
  },
  {
    title: 'Stock Market ELT Pipeline',
    tag: 'Data Engineering · Streaming · ELT',
    featured: false,
    problem: 'Market data pipelines fail quietly: one bad fetch or duplicate write corrupts every model downstream.',
    solution: '16-task Airflow DAG fetching 10 tickers, a validation gate before load, a 10-partition Kafka topic with idempotent writes and a dead-letter queue, and 6 dbt models — across 12 Docker services.',
    decision: 'Validation gate plus idempotent Kafka writes and a DLQ, so bad or repeated messages are caught instead of silently loaded.',
    stack: ['Airflow', 'Kafka', 'dbt', 'Docker', 'Python'],
    metrics: ['16-task DAG', '6 dbt models', '12 services', '25 tests'],
    link: '', // TODO: push latest code, then add repo URL
  },
  {
    title: 'Medical Transcription Classifier',
    tag: 'NLP · Healthcare AI · Data Augmentation',
    featured: false,
    problem: 'Medical transcription datasets are severely class-imbalanced — Surgery has 1,103 samples, Hospice has 6. SMOTE produces statistically plausible but clinically meaningless text.',
    solution: 'Team project. My part: language-model augmentation with ClinicalBERT and ALBERT masked language modeling, the SMOTE baseline, and the CNN classifier.',
    decision: 'Benchmarked against SMOTE as the standard fix for imbalance: 53% accuracy with SMOTE versus 94% with language-model augmentation.',
    stack: ['ClinicalBERT', 'ALBERT', 'CNN', 'Keras', 'SMOTE'],
    metrics: ['94% accuracy', '94.89 F1', 'vs 53% with SMOTE'],
    link: 'https://github.com/vaishk1804/LLM-based_Medical_Transcription_Classification',
  },
  {
    title: 'SAR Land-Cover Classification',
    tag: 'Computer Vision · Remote Sensing · IEEE IGARSS 2022',
    featured: false,
    problem: 'Optical imagery is blocked by cloud cover. SAR penetrates it, but standard CNN pipelines ignored interferometric coherence — a signal that directly encodes surface structure.',
    solution: 'CNN for 6-class land-cover classification on Sentinel-1 SAR, adding interferometric coherence as an input channel alongside backscatter. Published as "Efficient Use of Interferometric Coherence for Improvement in Classification of Urban and Tall Vegetation with SAR Data."',
    decision: 'Added coherence as a separate input channel so the CNN learns cross-channel spatial relationships directly.',
    stack: ['Keras', 'TensorFlow', 'Sentinel-1', 'SNAP'],
    metrics: ['+11% overall accuracy', '+15–25% urban & tall vegetation', 'IEEE IGARSS 2022'],
    link: 'https://www.researchgate.net/publication/363942838',
  },
  {
    title: 'SAV_535 RISC CPU Simulator',
    tag: 'Systems · Computer Architecture · C++',
    featured: false,
    problem: 'Seeing how cache and pipeline interact means running the same workload across four execution modes — a setup standard tools do not offer.',
    solution: 'RISC CPU simulator with a custom ISA (16 registers, 22 instructions plus NOP and HALT), an assembler, a pipeline with RAW stalls and no forwarding, and a memory hierarchy. The same workload runs across four modes, with a GUI for inspecting pipeline and cache state.',
    decision: 'Used Claude Code to reason through mode-specific pipeline behavior while validating correctness manually against benchmark outputs. AI proposes, I verify against ground truth.',
    stack: ['C++17', 'Qt', 'CMake', 'Claude Code'],
    metrics: ['4 execution modes', '4.4× and 5.6× speedups'],
    link: 'https://github.com/vaishk1804/SAV_535',
  },
  {
    title: 'Healthcare Topic Modeling',
    tag: 'NLP · Document Processing',
    featured: false,
    problem: '180 healthcare research papers with overlapping themes and no quick way to surface cross-paper trends without reading everything.',
    solution: 'Solo pipeline: pdfminer extraction, TF-IDF, LDA topic modeling, and KeyBERT keywords over 100 Healthcare 4.0 papers plus 20 each in cardiology, oncology, orthopedics, and health records.',
    decision: 'LDA over BERTopic — interpretability was the goal, and LDA topic-word distributions are directly readable for a literature review.',
    stack: ['Python', 'pdfminer', 'LDA', 'KeyBERT', 'TF-IDF', 'scikit-learn'],
    metrics: ['180 papers', '5 subdomains'],
    link: 'https://github.com/vaishk1804/Healthcare_Topic_Modelling',
  },
  {
    title: 'Healthcare Management System',
    tag: 'Full-Stack · Auth · Learning Prototype',
    featured: false,
    problem: 'Healthcare apps need different access for different users, and booking flows that respect those roles.',
    solution: 'Team learning prototype in React, Django REST Framework, and PostgreSQL. My part: Google sign-in, roles and permissions, session and token auth, role-based access control, and appointment booking and viewing.',
    decision: 'Google sign-in over email/password to reduce credential-handling risk.',
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Google OAuth 2.0'],
    metrics: ['Role-based access', 'Appointment booking'],
    link: 'https://github.com/vaishk1804/Apollo-healthcare',
  },
]

const TICKER_ITEMS = [
  '⚡ Now: full-stack on the Boomerroomers app — React Native · Expo · Node.js',
  '🛠 Shipped to 300+ users at Saint-Gobain — React · Django · AWS',
  '🤖 Building: PitWall — an F1 agent with tool use, guardrails, and evals',
  '◎ IEEE IGARSS 2022 — SAR land-cover classification',
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
        <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>VK</button>
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
            Open to SWE + AI roles · Hartford, CT · Open to relocation
          </div>
          <h1 className="hero-h1">
            I build systems that<br />
            <span className="hero-accent">ship, scale,</span><br />
            and hold up.
          </h1>
          <p className="hero-identity">
            Software engineer with AI depth — production systems owned end-to-end, from schema design through cloud deployment.
          </p>
          <p className="hero-lead">
            I completed my M.S. in Computer Science at UMass Amherst (GPA 4.0, May 2026). I've shipped production software to 300+ users across 5 factory sites at 99.9% uptime, built an LLM agent and a RAG system, and published IEEE research.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => go('Projects')}>View Projects</button>
            <a className="btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume ↓</a>
          </div>
          <div className="hero-focus">
            {['Software Engineering', 'AI / LLM Apps', 'Data Engineering', 'ML Engineering'].map(f => (
              <span key={f} className="focus-chip">{f}</span>
            ))}
          </div>
          <div className="hero-socials">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email ↗</a>
          </div>
        </div>

        <div className="hero-cards">
          <div className="hcard hcard-photo">
            <img src="/profile.jpg" alt="Profile photo" className="hero-photo-lg" />
            <div>
              <div className="hero-photo-name">Vaishnavi Kashyap</div>
              <div className="hero-photo-role">Software Engineer <span className="hero-role-dim">· AI</span></div>
            </div>
          </div>
          <div className="hcard hcard-main">
            <div className="hcard-eyebrow">Currently at</div>
            <div className="hcard-title">Boomerroomers</div>
            <div className="hcard-sub">Office &amp; Technology Operations Intern · Remote</div>
            <div className="hcard-rule" />
            <div className="hcard-eyebrow">Education</div>
            <div className="hcard-sub">M.S. Computer Science, UMass Amherst · GPA 4.0 · May 2026</div>
            <div className="hcard-rule" />
            <div className="hcard-eyebrow">Published at</div>
            <div className="hcard-pub">
              <span className="ieee-badge">IEEE</span>
              <span>Efficient Use of Interferometric Coherence for Improvement in Classification of Urban and Tall Vegetation with SAR Data · IGARSS 2022</span>
            </div>
          </div>
          <div className="hcard hcard-stack">
            <div className="hcard-eyebrow">Core stack</div>
            <div className="hcard-chips">
              {['Python', 'TypeScript', 'React', 'FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Anthropic SDK'].map(s => (
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
          <div className="exp-row exp-row--edu">
            <div className="exp-meta-col">
              <div className="exp-role">B.Tech Computer Science &amp; Engineering</div>
              <div className="exp-co">VIT Vellore</div>
              <div className="exp-period">2019 – 2023</div>
            </div>
            <div className="exp-edu-body">
              <p>GPA 3.86/4.0.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, className, children }) {
  return p.link
    ? <a href={p.link} target="_blank" rel="noreferrer" className={className}>{children}</a>
    : <div className={className}>{children}</div>
}

const ctaLabel = p =>
  !p.link ? 'Repo going public soon'
    : p.link.includes('github.com') ? 'View on GitHub ↗'
    : 'Read the paper ↗'

function ProjectsSection() {
  const [filter, setFilter] = useState('all')
  const catMap = {
    'LexRAG': ['ai', 'nlp'],
    'PitWall F1 Agent': ['ai'],
    'AirWatch': ['fullstack', 'data'],
    'Stock Market ELT Pipeline': ['data'],
    'Medical Transcription Classifier': ['ai', 'nlp'],
    'SAR Land-Cover Classification': ['ai'],
    'SAV_535 RISC CPU Simulator': ['systems'],
    'Healthcare Topic Modeling': ['nlp', 'ai'],
    'Healthcare Management System': ['fullstack'],
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
          {[['all', 'All'], ['ai', 'AI / ML'], ['nlp', 'NLP'], ['fullstack', 'Full-Stack'], ['data', 'Data Eng'], ['systems', 'Systems']].map(([k, l]) => (
            <button key={k} className={`filter-btn${filter === k ? ' active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>
        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map(p => (
              <ProjectCard key={p.title} p={p} className="proj-featured">
                <div className="pf-tag">{p.tag}</div>
                <h3 className="pf-title">{p.title}</h3>
                {p.problem && <p className="pf-summary">{p.problem}</p>}
                {p.decision && <div className="pf-decision-block"><span className="pf-decision-label">Why this approach —</span> {p.decision}</div>}
                {p.metrics.length > 0 && (
                  <div className="pf-metrics">{p.metrics.map(m => <span key={m} className="pf-metric">{m}</span>)}</div>
                )}
                <div className="pf-stack">{p.stack.map(s => <span key={s} className="pf-chip">{s}</span>)}</div>
                <div className="pf-cta">{ctaLabel(p)}</div>
              </ProjectCard>
            ))}
          </div>
        )}
        {rest.length > 0 && (
          <div className="proj-grid">
            {rest.map(p => (
              <ProjectCard key={p.title} p={p} className="proj-card">
                <div className="pc-tag">{p.tag}</div>
                <h3 className="pc-title">{p.title}</h3>
                {p.problem && <p className="pc-problem">{p.problem}</p>}
                {p.metrics.length > 0 && (
                  <div className="pc-metrics">{p.metrics.map(m => <span key={m} className="pc-metric">{m}</span>)}</div>
                )}
                <div className="pc-stack">
                  {p.stack.slice(0, 4).map(s => <span key={s} className="pc-chip">{s}</span>)}
                  {p.stack.length > 4 && <span className="pc-chip pc-more">+{p.stack.length - 4}</span>}
                </div>
              </ProjectCard>
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
            <h2>Available now.</h2>
            <p className="contact-body">
              If you're building something that needs to work at scale and be owned end-to-end — let's talk.
            </p>
            <p className="contact-auth">
              F1 OPT / STEM OPT eligible · Will require H-1B sponsorship for long-term employment
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
            {[['Now', 'Available'], ['Anywhere in U.S.', 'Open to relocation'], ['4.0 GPA', 'UMass M.S. CS']].map(([v, l]) => (
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
        <ExperienceSection />
        <ProjectsSection />
        <Impact />
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