import { FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'

const allProjects = [
  {
    title: 'AirWatch',
    tag: 'Backend · Data Engineering · APIs',
    categories: ['full-stack', 'data'],
    description:
      'Production-style backend platform for environmental data workflows built with FastAPI, PostgreSQL, SQLAlchemy/Alembic, Celery, and Redis — Docker-deployed with async task processing.',
    outcomes: [
      'Modular backend architecture with async task processing via Celery + Redis',
      'Production tooling: Alembic migrations, containerized services, env-based config',
      'Demonstrates backend engineering depth beyond notebook-based work',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis', 'Docker'],
    link: 'https://github.com/vaishk1804/airwatch',
  },
  {
    title: 'Healthcare Management System',
    tag: 'Full-Stack · Healthcare · Web App',
    categories: ['full-stack', 'healthcare'],
    description:
      'Full healthcare appointment and records platform built with React, Django REST Framework, and PostgreSQL — featuring Google OAuth, patient records, booking flows, and role-aware UX.',
    outcomes: [
      'End-to-end user workflows across frontend, backend, and database layers',
      'Google OAuth integration with JWT-based secure access patterns',
      'Product-minded full-stack development in a real-world healthcare domain',
    ],
    stack: ['React', 'Django', 'DRF', 'PostgreSQL', 'Google OAuth', 'REST APIs', 'Python'],
    link: 'https://github.com/vaishk1804/Apollo-healthcare',
  },
  {
    title: 'SEC Filings Copilot',
    tag: 'AI Product · Search · Full-Stack',
    categories: ['full-stack', 'ml'],
    description:
      'AI-oriented filings exploration app with FastAPI backend, Next.js frontend, and Docker infrastructure — a copilot-style system for structured financial document workflows.',
    outcomes: [
      'Product UX thinking with clean backend and infrastructure separation',
      'AI-assisted document interaction for a practical finance use case',
      'Expands portfolio breadth across full-stack and AI-product design',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Docker'],
    link: 'https://github.com/vaishk1804/sec-filings-copilot',
  },
  {
    title: 'Medical Transcription Classification Using LLMs',
    tag: 'NLP · Healthcare AI · Transformers',
    categories: ['ml', 'nlp', 'healthcare'],
    description:
      'Healthcare NLP classification pipeline using ClinicalBERT, ALBERT, T5, and GPT-Neo to improve label quality and performance on medical transcription data.',
    outcomes: [
      'Improved minority-class representation by ~30% through augmentation',
      'Improved overall classification accuracy by ~15% through model tuning',
      'Compared multiple transformer-based approaches in a healthcare NLP setting',
    ],
    stack: ['Python', 'ClinicalBERT', 'ALBERT', 'T5', 'GPT-Neo', 'TensorFlow', 'PyTorch'],
    link: 'https://github.com/vaishk1804/LLM-based_Medical_Transcription_Classification',
  },
  {
    title: 'Urban & Tall Vegetation Classification with SAR',
    tag: 'Computer Vision · Remote Sensing · IGARSS 2022',
    categories: ['ml', 'cv'],
    description:
      'CNN-based land-cover classification pipeline using SAR imagery, Keras, OpenCV, and Rasterio. Presented at IGARSS 2022 — accuracy improved from 72.5% to 79.3% using interferometric coherence.',
    outcomes: [
      'Overall accuracy improved from 72.5% → 79.3% with coherence features',
      'Urban and tall vegetation class accuracy improved by 15%–25%',
      'Accepted and presented at IEEE IGARSS 2022',
    ],
    stack: ['Python', 'Keras', 'OpenCV', 'Rasterio', 'CNNs', 'SNAP', 'Sentinel-1 SAR'],
    link: 'https://github.com/vaishk1804/Image_Classification_using_Vegetation_Data',
  },
  {
    title: 'Healthcare Topic Modeling',
    tag: 'NLP · Topic Modeling · Analytics',
    categories: ['ml', 'nlp', 'healthcare'],
    description:
      'Literature-mining NLP pipeline using LDA, KeyBERT, and TF-IDF to turn healthcare research papers into interpretable topic clusters across Healthcare 4.0 domains.',
    outcomes: [
      'Analyzed Healthcare 4.0 trends across a broad research corpus',
      'Compared themes across cardiology, oncology, orthopedics, and health records',
      'Converted unstructured research text into domain-level topic insights',
    ],
    stack: ['Python', 'LDA', 'KeyBERT', 'TF-IDF', 'scikit-learn', 'NLTK', 'spaCy'],
    link: 'https://github.com/vaishk1804/Healthcare_Topic_Modelling',
  },
  {
    title: 'Earnings Fraud Detection',
    tag: 'Machine Learning · Finance · Classification',
    categories: ['ml', 'finance'],
    description:
      'Fraud-detection workflow to classify earnings manipulation signals from structured financial data using interpretable feature-driven classification.',
    outcomes: [
      'Applied classification workflows to a finance-focused risk problem',
      'Feature-driven modeling with interpretable evaluation outcomes',
      'Expands portfolio in tabular ML and business analytics',
    ],
    stack: ['Python', 'Pandas', 'scikit-learn', 'Jupyter', 'Classification'],
    link: 'https://github.com/vaishk1804/Earnings-fraud-detection',
  },
  {
    title: 'Five Tickers Time Series Modeling',
    tag: 'Time Series · Forecasting · Finance',
    categories: ['ml', 'finance'],
    description:
      'Time-series modeling workflows across five stock tickers studying trends, behavior, and forecasting patterns in financial market data.',
    outcomes: [
      'Compared patterns across multiple financial time series',
      'Built forecasting-oriented notebook workflows for financial analysis',
      'Adds time-series breadth to the overall ML portfolio',
    ],
    stack: ['Python', 'Pandas', 'Time Series', 'Forecasting', 'Jupyter'],
    link: 'https://github.com/vaishk1804/Fivetickers-Time-series-modeling',
  },
  {
    title: 'Bank Binary Classification',
    tag: 'Machine Learning · Classification · Banking',
    categories: ['ml', 'finance'],
    description:
      'Binary classification workflow for a banking prediction problem using structured tabular data, preprocessing pipelines, and model evaluation best practices.',
    outcomes: [
      'End-to-end classification workflow on tabular business data',
      'Focused on interpretable performance and preprocessing quality',
      'Covers practical supervised learning in a financial domain',
    ],
    stack: ['Python', 'Pandas', 'scikit-learn', 'Classification', 'Jupyter'],
    link: 'https://github.com/vaishk1804/Bank_Binary_Classification',
  },
]

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'full-stack', label: 'Full-Stack / Backend' },
  { key: 'ml', label: 'ML / AI' },
  { key: 'nlp', label: 'NLP' },
  { key: 'cv', label: 'Computer Vision' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'finance', label: 'Finance' },
  { key: 'data', label: 'Data Engineering' },
]

function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <div className="project-header">
        <span className="pill">{project.tag}</span>
        <h3>{project.title}</h3>
      </div>
      <p>{project.description}</p>
      <div className="project-outcomes">
        <h4>Key outcomes</h4>
        <ul>
          {project.outcomes.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="stack-list">
        {project.stack.map((item) => (
          <span key={item} className="stack-pill">{item}</span>
        ))}
      </div>
      <div className="project-actions">
        <a href={project.link} target="_blank" rel="noreferrer">
          View on GitHub <FiExternalLink />
        </a>
      </div>
    </article>
  )
}

function Projects() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter((p) => p.categories.includes(active))

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <p className="eyebrow">Projects</p>
          <h2>Selected work across product engineering &amp; ML</h2>
          <p className="section-subtitle">
            Full-stack applications, backend systems, cloud and SQL workflows, healthcare and
            sustainability products, and ML projects spanning NLP, classification, forecasting,
            and remote sensing.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="filter-bar">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-pill${active === f.key ? ' filter-pill--active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
              {active === f.key && (
                <span className="filter-count">{filtered.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="project-grid" style={{ marginTop: '2rem' }}>
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default Projects