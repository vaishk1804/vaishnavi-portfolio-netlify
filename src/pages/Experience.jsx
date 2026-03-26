import { FiBriefcase, FiCloud, FiBookOpen } from 'react-icons/fi'

const experience = [
  {
    title: 'Software Engineer',
    org: 'Saint Gobain – INDEC',
    duration: 'Nov 2023 – Aug 2024',
    icon: <FiBriefcase />,
    points: [
      'Built production features across React, Angular, TypeScript, and SQL-backed systems for internal business workflows.',
      'Worked on carbon emissions tracking for 300+ employees and contributed to sustainability-focused reporting tools.',
      'Supported digitization of factory audit workflows across 5+ sites, improving structure and visibility in operational processes.',
      'Contributed to assembly planning, debugging, testing, documentation, and production support across multiple applications.',
    ],
  },
  {
    title: 'Data Science Intern',
    org: 'CloudSufi',
    duration: 'Jun 2022 – Aug 2022',
    icon: <FiCloud />,
    points: [
      'Built cloud data workflows on GCP using Cloud Storage and BigQuery for sustainability analytics and reporting.',
      'Processed 1M+ daily records and supported dashboarding, KPI reporting, and validation-oriented analytics tasks.',
      'Worked on forecasting workflows using Vertex AI and BigQuery ARIMA for data-driven planning use cases.',
      'Gained hands-on experience in cloud data engineering, analytics delivery, and business-facing ML applications.',
    ],
  },
  {
    title: 'MS in Computer Science',
    org: 'University of Massachusetts Amherst',
    duration: 'Expected May 2026',
    icon: <FiBookOpen />,
    points: [
      'GPA: 4.0/4.0 with coursework spanning Neural Networks, Network Security, Information Retrieval, Software Engineering, Data Science, and Statistics.',
      'Built projects across backend engineering, healthcare applications, NLP, remote sensing, analytics, and full-stack development.',
      'Used graduate coursework as a foundation for applied product-building, experimentation, and systems thinking.',
    ],
  },
]

function Experience() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <p className="eyebrow">Experience</p>
          <h2>Industry &amp; academic background</h2>
          <p className="section-subtitle">
            Full-stack engineering, cloud data work, and applied machine learning across real-world domains.
          </p>
        </div>

        <div className="experience-grid">
          {experience.map((item) => (
            <article key={`${item.title}-${item.org}`} className="card experience-card">
              <div className="experience-top">
                <div className="experience-heading">
                  <div className="experience-icon">{item.icon}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="muted">{item.org}</p>
                  </div>
                </div>
                <span className="pill">{item.duration}</span>
              </div>

              <ul className="experience-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience