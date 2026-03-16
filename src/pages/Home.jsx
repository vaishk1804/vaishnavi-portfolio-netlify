import {
  FiArrowRight,
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
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const featuredSkills = [
  'React',
  'Angular',
  'TypeScript',
  'Python',
  'Django',
  'FastAPI',
  'PostgreSQL',
  'BigQuery',
  'Docker',
  'GCP',
  'TensorFlow',
  'PyTorch',
]

const interests = [
  {
    icon: <FiMonitor />,
    title: 'Full-Stack Engineering',
    text: 'Built frontend and backend features across React, Angular, Django, FastAPI, and SQL-based systems.',
  },
  {
    icon: <FiDatabase />,
    title: 'Data Systems & Analytics',
    text: 'Worked with PostgreSQL, SQL Server, BigQuery, cloud data workflows, dashboards, and reporting pipelines.',
  },
  {
    icon: <FiCpu />,
    title: 'Machine Learning & NLP',
    text: 'Built classification and modeling workflows using transformer-based models and modern ML tooling.',
  },
  {
    icon: <FiGlobe />,
    title: 'Sustainability Tech',
    text: 'Worked on carbon emissions tracking, sustainability reporting, geospatial analytics, and forecasting.',
  },
  {
    icon: <FiShield />,
    title: 'Healthcare Applications',
    text: 'Built systems for healthcare workflows, records, and medical transcription classification.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Productive Engineering',
    text: 'Interested in scalable APIs, maintainable systems, debugging, production support, and user-focused design.',
  },
]

function Home() {
  return (
    <>
      <section className="hero hero-blue">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">MS in Computer Science • UMass Amherst • GPA 4.0</p>

            <h1>
              Building reliable web apps, APIs, and data products with a modern
              full-stack toolkit.
            </h1>

            <p className="lead">
              I’m Vaishnavi Kashyap, a software engineer with experience across
              full-stack development, backend APIs, cloud data workflows, and
              machine learning projects. I enjoy building useful systems that are
              practical, scalable, and easy to work with.
            </p>

            <div className="hero-meta">
              <span>
                <FiMapPin /> Amherst, Massachusetts
              </span>
              <a href="mailto:vaishnavikashyap1804@gmail.com">
                <FiMail /> vaishnavikashyap1804@gmail.com
              </a>
            </div>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/projects">
                View Projects <FiArrowRight />
              </Link>

              <a
                className="btn btn-secondary"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <FiDownload /> Resume
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/vaishk1804"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FiGithub />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/vaishnavikashyap2001"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
                <span>LinkedIn</span>
              </a>

              <a href="mailto:vaishnavikashyap1804@gmail.com" aria-label="Email">
                <FiMail />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="card floating-card highlight-card">
              <div className="mini-badge">Leveling up in</div>
              <h3>Full-Stack + Backend + Data</h3>
              <ul className="feature-list">
                <li>Web applications</li>
                <li>Scalable APIs</li>
                <li>SQL and cloud pipelines</li>
                <li>ML-powered products</li>
              </ul>
            </div>

            <div className="card skills-hero-card">
  <div className="mini-badge">Main skills</div>
  <h3>Tech I use most</h3>

  <div className="skills-chip-grid">
    {featuredSkills.map((skill) => (
      <span key={skill} className="skill-chip gamified-chip">
        <FiCode />
        {skill}
      </span>
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
            <h2>Engineering with curiosity, structure, and real-world impact</h2>
            <p className="section-subtitle">
              I like building software that feels clean to use and solid under the
              hood.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-text card">
              <p>
                I build applications at the intersection of software engineering,
                analytics, and machine learning. My experience includes full-stack
                development, backend API design, cloud-based data workflows,
                debugging, testing, and production support.
              </p>

              <p>
                My work has included sustainability analytics, healthcare systems,
                NLP-based classification, SQL-backed products, and deployable
                backend services. I’m especially interested in roles where I can
                contribute across product thinking, engineering quality, and data.
              </p>
            </div>

            <div className="about-list card">
              <h3>Core Stack Snapshot</h3>
              <ul>
                <li>Frontend: React, Angular, TypeScript, Tailwind CSS</li>
                <li>Backend: Python, Django, FastAPI, REST APIs</li>
                <li>Data: PostgreSQL, SQL Server, BigQuery</li>
                <li>Cloud & Tools: GCP, Docker, Git/GitHub, Postman</li>
                <li>ML: TensorFlow, PyTorch, transformer-based NLP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">Interests</p>
            <h2>Areas I’ve worked in</h2>
            <p className="section-subtitle">
              These are the kinds of products, systems, and domains I’m most drawn to.
            </p>
          </div>

          <div className="interests-grid">
            {interests.map((item) => (
              <article key={item.title} className="card interest-card">
                <div className="interest-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home