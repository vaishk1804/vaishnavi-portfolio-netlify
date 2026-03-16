import { FiExternalLink } from 'react-icons/fi'

const fullStackProjects = [
  {
    title: 'AirWatch',
    tag: 'Backend • Data Engineering • APIs',
    description:
      'Built a production-style backend using FastAPI and PostgreSQL with SQLAlchemy, Alembic, Celery, and Redis for async processing. Containerized the application with Docker for reproducible deployment.',
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'Celery',
      'Redis',
      'Docker',
      'Render',
    ],
    link: 'https://github.com/vaishk1804/airwatch',
  },
  {
    title: 'Healthcare Management System',
    tag: 'Full-Stack • Healthcare • Web App',
    description:
      'Built a healthcare appointment and records platform using React, Django, and PostgreSQL with secure authentication, role-based access, patient records, appointment booking, and risk-assessment workflows.',
    stack: [
      'React',
      'Django',
      'PostgreSQL',
      'OAuth',
      'REST APIs',
      'JavaScript',
      'Python',
    ],
    link: 'https://github.com/vaishk1804/Apollo-healthcare',
  },
  {
    title: 'SEC Filings Copilot',
    tag: 'AI Product • Search • Full-Stack',
    description:
      'Developed an AI-oriented filings exploration app with separate backend, frontend, and infrastructure layers. Designed as a copilot-style system for exploring financial filings and structured document workflows.',
    stack: ['Python', 'TypeScript', 'Docker', 'Frontend', 'Backend', 'Infra'],
    link: 'https://github.com/vaishk1804/sec-filings-copilot',
  },
]

const mlProjects = [
  {
    title: 'Medical Transcription Classification Using LLMs',
    tag: 'Machine Learning • NLP • Healthcare AI',
    description:
      'Built a healthcare NLP classification pipeline using ClinicalBERT, ALBERT, T5, and GPT-Neo. Improved minority-class representation by about 30% and increased classification accuracy by about 15% through iterative experimentation.',
    stack: [
      'Python',
      'ClinicalBERT',
      'ALBERT',
      'T5',
      'GPT-Neo',
      'TensorFlow',
      'PyTorch',
    ],
    link: 'https://github.com/vaishk1804/LLM-based_Medical_Transcription_Classification',
  },
  {
    title: 'Urban and Tall Vegetation Classification with SAR Data',
    tag: 'Computer Vision • Remote Sensing • IGARSS 2022',
    description:
      'Built a CNN-based land-cover classification pipeline using SAR imagery, Keras, OpenCV, and Rasterio. Improved overall classification accuracy from 66% to 77% on 500+ SAR images and presented the work at IGARSS 2022.',
    stack: ['Python', 'Keras', 'OpenCV', 'Rasterio', 'CNNs', 'Remote Sensing'],
    link: 'https://github.com/vaishk1804/Image_Classification_using_Vegetation_Data',
  },
  {
    title: 'Healthcare Topic Modeling',
    tag: 'NLP • Topic Modeling • Healthcare Analytics',
    description:
      'Designed a literature-mining NLP pipeline using LDA, KeyBERT, and TF-IDF to turn healthcare research papers into interpretable topic clusters. Analyzed Healthcare 4.0 trends across a broad paper corpus and compared themes across cardiology, oncology, orthopedics, and health records.',
    stack: [
      'Python',
      'LDA',
      'KeyBERT',
      'TF-IDF',
      'pandas',
      'scikit-learn',
      'NLTK',
      'spaCy',
    ],
    link: 'https://github.com/vaishk1804/Healthcare_Topic_Modelling',
  },
  {
    title: 'Earnings Fraud Detection',
    tag: 'Machine Learning • Finance • Classification',
    description:
      'Built a fraud-detection modeling workflow to classify potential earnings manipulation signals from financial data. Explored feature-driven classification approaches and evaluation workflows for finance-focused prediction tasks.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Jupyter', 'Classification'],
    link: 'https://github.com/vaishk1804/Earnings-fraud-detection',
  },
  {
    title: 'Five Tickers Time Series Modeling',
    tag: 'Time Series • Forecasting • Finance',
    description:
      'Built time-series modeling workflows on five stock tickers to analyze patterns, trends, and forecasting behavior across financial market data. Used notebook-based experimentation for comparative modeling and evaluation.',
    stack: ['Python', 'Pandas', 'Time Series', 'Forecasting', 'Jupyter'],
    link: 'https://github.com/vaishk1804/Fivetickers-Time-series-modeling',
  },
  {
    title: 'Bank Binary Classification',
    tag: 'Machine Learning • Classification • Banking',
    description:
      'Built a binary classification workflow for a banking-focused prediction problem using notebook-based model experimentation, preprocessing, and evaluation. Focused on structured tabular data and interpretable classification performance.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Classification', 'Jupyter'],
    link: 'https://github.com/vaishk1804/Bank_Binary_Classification',
  },
]

function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <div className="project-header">
        <span className="pill">{project.tag}</span>
        <h3>{project.title}</h3>
      </div>

      <p>{project.description}</p>

      <div className="stack-list">
        {project.stack.map((item) => (
          <span key={item} className="stack-pill">
            {item}
          </span>
        ))}
      </div>

      <div className="project-actions">
        <a href={project.link} target="_blank" rel="noreferrer">
          View Project <FiExternalLink />
        </a>
      </div>
    </article>
  )
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function Projects() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <div className="projects-title-row">
            

            <div className="project-jump-buttons">
              <button
                type="button"
                className="project-jump-pill"
                onClick={() => scrollToSection('software-projects')}
              >
                Software / Full-Stack
              </button>

              <button
                type="button"
                className="project-jump-pill"
                onClick={() => scrollToSection('ml-projects')}
              >
                ML / AI
              </button>
            </div>
          </div>

          <p className="section-subtitle">
            My portfolio spans product-oriented web applications, backend systems,
            healthcare and sustainability tools, and applied ML projects in NLP,
            computer vision, classification, and forecasting.
          </p>
        </div>

        <div id="software-projects" className="project-section-block">
          <div className="project-section-header">
            <h3>Full-Stack / Product / Backend Projects</h3>
            <p>
              Projects focused on applications, APIs, architecture, and
              production-style engineering.
            </p>
          </div>

          <div className="project-grid">
            {fullStackProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div id="ml-projects" className="project-section-block">
          <div className="project-section-header">
            <h3>ML / AI / Analytics Projects</h3>
            <p>
              Projects focused on modeling, topic extraction, classification,
              forecasting, computer vision, and healthcare or finance analytics.
            </p>
          </div>

          <div className="project-grid">
            {mlProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects