import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Impact', 'Contact']

const METRICS = [
  { value: '300+', label: 'People using a tool I pitched myself' },
  { value: '99.9%', label: 'Uptime on that platform' },
  { value: '<100ms', label: 'A 3–4 s query, after one index' },
  { value: '230 RPS', label: 'AirWatch under load, 0% errors' },
  { value: '4.0', label: 'GPA · UMass M.S. CS' },
]

const SKILLS = [
  { area: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Bash'] },
  { area: 'Frontend', items: ['React', 'React Native', 'Expo', 'Angular', 'Three.js', 'Tailwind CSS'] },
  { area: 'Backend', items: ['FastAPI', 'Django', 'DRF', 'Node.js', 'SQLAlchemy', 'Alembic', 'Celery / Celery Beat', 'Gunicorn', 'REST APIs', 'OAuth 2.0'] },
  { area: 'Data & Cloud', items: ['PostgreSQL', 'BigQuery', 'Redis', 'Kafka', 'Airflow', 'dbt', 'Docker', 'AWS (EC2, S3, CloudWatch)', 'GCP Vertex AI', 'AppSheet'] },
  { area: 'AI / ML', items: ['Anthropic SDK', 'Tool-using agents', 'Eval harnesses', 'RAG (BM25 + dense, RRF)', 'ChromaDB', 'Embedding fine-tuning', 'ClinicalBERT', 'ALBERT', 'Keras', 'TensorFlow', 'scikit-learn', 'ARIMA', 'LDA', 'KeyBERT', 'Pandas', 'NumPy'] },
  { area: 'Tools', items: ['Git', 'GitHub Actions', 'CMake', 'VS Code'] },
]

const EXPERIENCE = [
  {
    role: 'Office & Technology Operations Intern',
    company: 'Boomerroomers',
    badge: 'B', badgeTone: 'blue',
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
    badge: 'SG', badgeTone: 'navy',
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
    badge: 'CS', badgeTone: '',
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
    lessonLabel: 'The bug that taught me the most',
    lesson: "After re-ingesting at a new chunk size, ChromaDB held 58,828 vectors while BM25 had 14,492. Chroma's upsert only overwrites matching IDs, so stale chunks stayed behind and polluted retrieval. Now every ingestion run resets the collection first.",
    stack: ['Python', 'ChromaDB', 'BM25', 'Dense retrieval', 'RRF', 'Embedding fine-tuning'],
    metrics: ['510 CUAD contracts', 'Top-1 retrieval 3.5% → 8.0%'],
    link: 'https://github.com/vaishk1804/lexrag',
  },
  {
    title: 'PitWall F1 Agent',
    tag: 'LLM Agent · Tool Use · Evals',
    featured: true,
    problem: 'LLM agents answering factual questions can state wrong numbers with full confidence — and without evals you cannot tell whether a fix helped.',
    solution: 'Formula 1 agent built on the Anthropic SDK with 8 tools and confidence guardrails, backed by an eval harness and test suite.',
    decision: 'Built the eval harness (10 cases across 9 categories) alongside the agent, so guardrail changes are tested rather than guessed. The confidence guardrails reduce hallucination risk.',
    lessonLabel: "What I'd change",
    lesson: "Tool results get cut to 50 rows before they reach the model, but they aren't sorted first, so the agent can lose the exact laps or pit stops it needs. Next step: sort or aggregate before trimming.",
    stack: ['Anthropic SDK', 'Tool use', 'Guardrails', 'Eval harness'],
    metrics: ['8 tools', '10-case eval harness', '66 tests'],
    link: 'https://github.com/vaishk1804/pitwall-ai',
  },
  {
    title: 'AirWatch',
    tag: 'Full-Stack · Data Engineering · APIs',
    featured: true,
    problem: 'Synchronous fetch pipelines break whenever the external API is slow — making real-time air quality dashboards fragile under load.',
    solution: 'Decoupled ingestion from the request cycle with Celery + Redis. FastAPI serves pre-ingested data from PostgreSQL to a React + TypeScript frontend. Containerized with Docker; GitHub Actions CI runs lint, typecheck, tests, and the Docker build.',
    decision: 'Celery over a background thread — thread-based ingestion dies silently on restart. Under 100 concurrent clients, throughput went from 63 RPS at 74% errors to 230 RPS at 0% errors.',
    lessonLabel: 'The tricky part',
    lesson: "A 74% error rate under load looked like a server bug. It was the weather API rate-limiting me, with its 403s surfacing as 500s, plus synchronous calls blocking the request path. Moving the weather fetch into an hourly Celery Beat job got it to 230 RPS with zero errors.",
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Celery Beat', 'Redis', 'Docker', 'GitHub Actions'],
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
    compact: true,
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
    compact: true,
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
    compact: true,
    problem: 'Healthcare apps need different access for different users, and booking flows that respect those roles.',
    solution: 'Team learning prototype in React, Django REST Framework, and PostgreSQL. My part: Google sign-in, roles and permissions, session and token auth, role-based access control, and appointment booking and viewing.',
    decision: 'Google sign-in over email/password to reduce credential-handling risk.',
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Google OAuth 2.0'],
    metrics: ['Role-based access', 'Appointment booking'],
    link: 'https://github.com/vaishk1804/Apollo-healthcare',
  },
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

function Hero({ onOpenTerminal }) {
  return (
    <section id="about" className="hero">
      <div className="container">
        <div className="bento">
          <div className="cell cell-intro">
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              Open to SWE + AI roles · Hartford, CT · Happy to relocate
            </div>
            <h1 className="hero-h1">
              Hi, I'm Vaish.<span className="wave" aria-hidden="true">👋</span><br />
              I build software<br />
              <span className="hero-accent">people actually use.</span>
            </h1>
            <p className="hero-identity">
              At Saint-Gobain I pitched a carbon tracker nobody had asked for, built it, and watched 300+ people start using it. That's still my favorite way to work: find a real problem, then own it end to end.
            </p>
            <p className="hero-lead">
              Since then I've built forecasting pipelines at CloudSufi, published computer-vision research at IEEE IGARSS, and lately I've been building LLM agents and retrieval systems. I completed my M.S. in Computer Science at UMass Amherst (GPA 4.0, May 2026).
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

          <div className="cell cell-photo">
            <img src="/profile.jpg" alt="Vaishnavi Kashyap" />
            <div className="photo-caption">
              <div className="photo-name">Vaishnavi Kashyap</div>
              <div className="photo-role">Software engineer · AI</div>
            </div>
          </div>

          <div className="cell cell-info">
            <div className="cell-label">Currently</div>
            <div className="cell-title">Boomerroomers</div>
            <div className="cell-sub">Office &amp; Technology Operations Intern · Remote</div>
          </div>

          <div className="cell cell-info">
            <div className="cell-label">Education</div>
            <div className="cell-title">UMass Amherst</div>
            <div className="cell-sub">M.S. Computer Science · GPA 4.0 · May 2026</div>
          </div>

          <a className="cell cell-info cell-link" href="https://www.researchgate.net/publication/363942838" target="_blank" rel="noreferrer">
            <div className="cell-label">Published <span className="cell-arrow">↗</span></div>
            <div className="cell-title"><span className="ieee-badge">IEEE</span> IGARSS 2022</div>
            <div className="cell-sub">Using interferometric coherence to better classify urban areas and tall vegetation in SAR data.</div>
          </a>

          <div className="cell cell-info cell-offclock">
            <div className="cell-label">Off the clock</div>
            <div className="cell-title">Formula 1</div>
            <div className="cell-sub">Mostly for the teams and the strategy calls. Verstappen and Vettel fan.</div>
          </div>

          <div className="cell cell-stack">
            <div className="cell-label">Core stack</div>
            <div className="chips">
              {['Python', 'TypeScript', 'React', 'FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Anthropic SDK'].map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
            <div className="cell-label cell-label--spaced">Roles I'm looking for</div>
            <div className="chips">
              {['Software Engineering', 'AI / LLM Apps', 'Data Engineering', 'ML Engineering'].map(f => (
                <span key={f} className="chip chip--outline">{f}</span>
              ))}
            </div>
          </div>

          <button className="cell cell-term" onClick={onOpenTerminal}>
            <div className="cell-label">For engineers</div>
            <code className="term-hint">$ help<span className="term-caret" /></code>
            <div className="cell-sub">
              Press <kbd>Ctrl</kbd> + <kbd>`</kbd> or click here to explore this site from a terminal.
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

const SECTIONS = ['about', 'experience', 'projects', 'impact', 'contact']

const HELP = [
  'help              list commands',
  'about             who I am',
  'experience        where I have worked',
  'projects          list projects',
  'open <n>          open project n',
  'skills            tech stack',
  'contact           how to reach me',
  'resume            open my resume',
  'goto <section>    about | experience | projects | impact | contact',
  'f1                pit wall readout',
  'clear             clear the screen',
  'exit              close (or press Esc)',
]

const WELCOME = [{ type: 'out', text: 'vaish@portfolio — type "help" to see commands.' }]

function Terminal({ open, onClose }) {
  const [lines, setLines] = useState(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  if (!open) return null

  const run = raw => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/)
    switch (cmd.toLowerCase()) {
      case '':
        return []
      case 'help':
        return HELP
      case 'about':
        return [
          "Hi, I'm Vaish. I build software people actually use, often with an AI angle.",
          'Completed my M.S. in Computer Science at UMass Amherst (GPA 4.0, May 2026).',
          'Currently: Office & Technology Operations Intern at Boomerroomers.',
          'Off the clock: F1 strategy, Verstappen and Vettel fan.',
        ]
      case 'experience':
        return EXPERIENCE.map(j => `${j.period.padEnd(20)} ${j.role} — ${j.company}`)
      case 'projects':
        return [...PROJECTS.map((p, i) => `[${i + 1}] ${p.title}`), '', 'Type "open <n>" to view one.']
      case 'open': {
        const p = PROJECTS[parseInt(args[0], 10) - 1]
        if (!p) return [`open: no project "${args[0] ?? ''}". Type "projects" for the list.`]
        if (!p.link) return [`${p.title}: repo going public soon.`]
        window.open(p.link, '_blank', 'noopener')
        return [`Opening ${p.title}…`]
      }
      case 'skills':
        return SKILLS.map(g => `${g.area.padEnd(14)} ${g.items.join(', ')}`)
      case 'contact':
        return [
          'email     vaishnavikashyap1804@gmail.com',
          'linkedin  linkedin.com/in/vaishnavikashyap2001',
          'github    github.com/vaishk1804',
        ]
      case 'resume':
        window.open('/resume.pdf', '_blank', 'noopener')
        return ['Opening resume…']
      case 'goto': {
        const s = (args[0] || '').toLowerCase()
        if (!SECTIONS.includes(s)) return [`goto: try one of ${SECTIONS.join(', ')}`]
        onClose()
        setTimeout(() => go(s), 150)
        return []
      }
      case 'f1':
        return [
          '┌─ PIT WALL ───────────────────────────────┐',
          '  Favourite drivers   Verstappen · Vettel',
          '  Best part           team strategy calls',
          '  Current stint       building LLM agents',
          '  Side project        PitWall, an F1 agent',
          '└──────────────────────────────────────────┘',
          '  📻 "Box, box." Try: open 2',
        ]
      case 'sudo':
        return ['Permission denied. Nice try.']
      case 'clear':
        return null
      case 'exit':
        onClose()
        return []
      default:
        return [`command not found: ${cmd}. Type "help".`]
    }
  }

  const submit = e => {
    e.preventDefault()
    const out = run(input)
    if (out === null) setLines([])
    else setLines(l => [...l, { type: 'in', text: input }, ...out.map(text => ({ type: 'out', text }))])
    if (input.trim()) setHistory(h => [input, ...h])
    setHIdx(-1)
    setInput('')
  }

  const onKey = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      if (i >= 0) { setHIdx(i); setInput(history[i]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(i)
      setInput(i >= 0 ? history[i] : '')
    }
  }

  return (
    <div className="term-backdrop" onClick={onClose}>
      <div className="term" role="dialog" aria-label="Site terminal" onClick={e => e.stopPropagation()}>
        <div className="term-bar">
          <span className="term-dots"><i /><i /><i /></span>
          <span className="term-title">vaish@portfolio: ~</span>
          <button className="term-close" onClick={onClose} aria-label="Close terminal">×</button>
        </div>
        <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className={`term-line term-line--${l.type}`}>
              {l.type === 'in' && <span className="term-prompt">$ </span>}
              {l.text}
            </div>
          ))}
          <form className="term-input-row" onSubmit={submit}>
            <span className="term-prompt">$</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

function Impact() {
  return (
    <section id="impact" className="impact">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="eyebrow-num">03</span>By the numbers</span>
          <h2>A few numbers I'm proud of</h2>
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
          <span className="eyebrow"><span className="eyebrow-num">01</span>Experience</span>
          <h2>Where I've worked</h2>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className="exp-row">
              <div className="exp-meta-col">
                <div className={`exp-badge${job.badgeTone ? ` exp-badge--${job.badgeTone}` : ''}`} aria-hidden="true">{job.badge}</div>
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
        </div>
        <div className="edu-head">
          <span className="eyebrow">Education</span>
        </div>
        <div className="edu-grid">
          <div className="edu-card">
            <div className="exp-badge exp-badge--navy" aria-hidden="true">UM</div>
            <div className="edu-body">
              <div className="edu-degree">M.S. Computer Science</div>
              <div className="edu-school">UMass Amherst · Sep 2024 – May 2026 <span className="edu-gpa">GPA 4.0</span></div>
            </div>
          </div>
          <div className="edu-card">
            <div className="exp-badge" aria-hidden="true">VIT</div>
            <div className="edu-body">
              <div className="edu-degree">B.Tech Computer Science &amp; Engineering</div>
              <div className="edu-school">VIT Vellore · 2019 – 2023 <span className="edu-gpa">GPA 3.86</span></div>
            </div>
          </div>
        </div>
        <div className="edu-coursework">
          <span className="edu-cw-label">M.S. coursework</span>
          {['Neural Networks', 'Information Retrieval', 'System Design', 'Software Engineering', 'Networks & Security', 'Cryptography', 'Computer Architecture'].map(c => (
            <span key={c} className="edu-course">{c}</span>
          ))}
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
  const rest = visible.filter(p => !p.featured && !p.compact)
  const more = visible.filter(p => p.compact)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="eyebrow-num">02</span>Selected work</span>
          <h2>Things I've built</h2>
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
                {(p.lesson || p.decision) && (
                  <div className="pf-decision-block">
                    <span className="pf-decision-label">{p.lesson ? p.lessonLabel : 'Why this approach'}</span>
                    {p.lesson || p.decision}
                  </div>
                )}
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
        {more.length > 0 && (
          <div className="also-built">
            <span className="also-label">Also built</span>
            {more.map(p => (
              <a key={p.title} className="also-item" href={p.link} target="_blank" rel="noreferrer">
                <span className="also-title">{p.title}</span>
                <span className="also-tag">{p.tag.split(' · ')[0]}</span>
                <span className="also-arrow">↗</span>
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
    await navigator.clipboard?.writeText(EMAIL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }
  return (
    <section id="contact" className="contact">
      <div className={`toast${copied ? ' toast--show' : ''}`} role="status" aria-live="polite">
        <span className="toast-dot" />Email copied. Talk soon! 👋
      </div>
      <div className="container">
        <div className="contact-inner">
          <div className="contact-copy">
            <span className="eyebrow"><span className="eyebrow-num">04</span>Get in touch</span>
            <h2>Available now.</h2>
            <p className="contact-body">
              I'm looking for a team where I can build real things for real users, especially where AI meets a real product. If that sounds like you, I'd love to hear from you.
            </p>
            <p className="contact-auth">
              F1 OPT / STEM OPT eligible
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
            <div className="signoff">
              <span className="signoff-note">Thanks for scrolling all the way down.</span>
              <span className="signature">Vaish</span>
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
  const [termOpen, setTermOpen] = useState(false)
  useEffect(() => {
    const h = e => {
      if (e.ctrlKey && (e.code === 'Backquote' || e.key === '`' || e.key === '~')) {
        e.preventDefault()
        setTermOpen(o => !o)
      } else if (e.key === 'Escape') {
        setTermOpen(false)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // Gentle fade-up as sections scroll into view
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = document.querySelectorAll('.cell, .exp-row, .proj-featured, .proj-card, .metric, .skills-table, .contact-inner')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    els.forEach((el, i) => {
      el.classList.add('reveal')
      el.style.transitionDelay = `${(i % 4) * 70}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero onOpenTerminal={() => setTermOpen(true)} />
        <ExperienceSection />
        <ProjectsSection />
        <Impact />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Vaishnavi Kashyap</span>
          <span className="footer-hint">Psst, try <kbd>Ctrl</kbd> + <kbd>`</kbd></span>
          <div className="footer-links">
            <a href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vaishnavikashyap2001" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:vaishnavikashyap1804@gmail.com">Email</a>
          </div>
        </div>
      </footer>
      <ScrollTop />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  )
}