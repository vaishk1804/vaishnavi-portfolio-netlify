const experience = [
  {
    title: 'Software Engineer',
    org: 'Saint Gobain – INDEC',
    duration: 'Nov 2023 – Aug 2024',
    points: [
      'Built production features using React, Angular, TypeScript, and SQL-backed systems.',
      'Worked on carbon emissions tracking for 300+ employees.',
      'Supported digitization of factory audit workflows across 5+ sites.',
      'Contributed to assembly planning, debugging, testing, documentation, and production support.',
    ],
  },
  {
    title: 'Data Science Intern',
    org: 'CloudSufi',
    duration: 'Jun 2022 – Aug 2022',
    points: [
      'Built cloud data workflows on GCP using Cloud Storage and BigQuery.',
      'Processed 1M+ daily records for sustainability analytics and reporting.',
      'Worked on forecasting using Vertex AI and BigQuery ARIMA.',
      'Delivered dashboards, KPI reporting, and validation checks for business use cases.',
    ],
  },
  {
    title: 'MS in Computer Science',
    org: 'University of Massachusetts Amherst',
    duration: 'Expected May 2026',
    points: [
      'GPA: 4.0/4.0',
      'Relevant coursework: Neural Networks, Network Security, Information Retrieval, Software Engineering, Data Science, Statistics.',
      'Built projects spanning backend engineering, healthcare applications, NLP, and analytics.',
    ],
  },
]

function Experience() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <p className="eyebrow">Experience</p>
          <h2>Industry and academic experience</h2>
          <p className="section-subtitle">
            Full-stack engineering, cloud data work, and applied machine learning.
          </p>
        </div>

        <div className="experience-grid">
          {experience.map((item) => (
            <article key={`${item.title}-${item.org}`} className="card experience-card">
              <div className="experience-top">
                <div>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.org}</p>
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