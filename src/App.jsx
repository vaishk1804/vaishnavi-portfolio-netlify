import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

const projects = [
  {
    title: 'AirWatch',
    tag: 'Full-Stack • Data Engineering • API',
    description:
      'Built an air-quality analytics platform using OpenAQ and weather data, with a Vite frontend and backend services for ingesting, storing, and serving environmental insights.',
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/vaishk1804/airwatch',
  },
  {
    title: 'SEC Filings Copilot',
    tag: 'RAG • NLP • Search',
    description:
      'Designed a retrieval-based assistant to help users explore SEC filings faster using chunking, embeddings, and structured question answering over company documents.',
    stack: ['Python', 'FastAPI', 'Vector Search', 'LLMs'],
    link: '#',
  },
  {
    title: 'Global Financial Risk Prediction',
    tag: 'Machine Learning • Forecasting',
    description:
      'Worked on predictive modeling with economic, geopolitical, and sentiment signals to estimate changing financial risk conditions and support decision-making.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'Data Visualization'],
    link: '#',
  },
]

const skills = [
  'Python',
  'SQL',
  'React',
  'JavaScript',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Pandas',
  'scikit-learn',
  'Tableau',
  'Power BI',
  'Git/GitHub',
]

const experience = [
  {
    title: 'Graduate Student, MS in Computer Science',
    org: 'UMass Amherst',
    text: 'Focused on software engineering, analytics, machine learning, and systems-oriented projects while building production-style portfolio work.',
  },
  {
    title: 'Technical Analyst',
    org: 'Previous Industry Experience',
    text: 'Worked across technical analysis, requirements gathering, stakeholder communication, and translating business needs into practical technical solutions.',
  },
]

function App() {
  return (
    <div>
      <header className="site-header">
        <div className="container nav">
          <a href="#top" className="brand">Vaishnavi Kashyap</a>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">MS in Computer Science • UMass Amherst</p>
            <h1>Building thoughtful software, analytics, and ML-driven products.</h1>
            <p className="lead">
              I’m Vaishnavi, a developer and analyst with experience across full-stack apps,
              data workflows, and machine learning projects. I enjoy turning complex
              technical problems into clean, usable solutions.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                View Projects <FiArrowRight />
              </a>
              <a className="btn btn-secondary" href="/resume.pdf">
                Resume <FiDownload />
              </a>
            </div>
            <div className="hero-meta">
              <span><FiMapPin /> Amherst, Massachusetts</span>
              <a href="mailto:vaishnavi@example.com"><FiMail /> vaishnavi@example.com</a>
            </div>
          </div>

          <div className="hero-card">
            <p className="card-label">Focus Areas</p>
            <ul>
              <li>Full-stack development</li>
              <li>Analytics engineering</li>
              <li>Machine learning applications</li>
              <li>APIs and data products</li>
            </ul>
          </div>
        </section>

        <section id="about" className="section container">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Technical profile</h2>
          </div>
          <div className="about-grid">
            <div className="panel">
              <p>
                I bring a mix of software, analytics, and communication skills. My work often
                sits at the intersection of product thinking, data analysis, and engineering
                implementation.
              </p>
              <p>
                I’ve built projects involving environmental data, financial risk modeling,
                reporting workflows, dashboards, and modern web development with deployable
                applications.
              </p>
            </div>
            <div className="panel">
              {experience.map((item) => (
                <div key={item.title} className="timeline-item">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.org}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Selected work</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <p className="project-tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View project <FiArrowRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools I work with</h2>
          </div>
          <div className="skills-wrap panel">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">{skill}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="section container contact-panel">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s connect</h2>
            <p>
              I’m interested in software engineering, data, and ML-focused opportunities where
              I can build useful systems and keep growing as an engineer.
            </p>
          </div>
          <div className="contact-links">
            <a className="btn btn-secondary" href="https://github.com/vaishk1804" target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>
            <a className="btn btn-secondary" href="#" target="_blank" rel="noreferrer">
              <FiLinkedin /> LinkedIn
            </a>
            <a className="btn btn-primary" href="mailto:vaishnavi@example.com">
              <FiMail /> Email Me
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
