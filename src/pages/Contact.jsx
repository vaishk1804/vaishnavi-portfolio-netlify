import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

function Contact() {
  return (
    <section className="section">
      <div className="container">
        <div className="contact-card card">
          <div className="section-title">
            <p className="eyebrow">Contact</p>
            <h2>Let’s connect</h2>
            <p className="section-subtitle">
              I’m currently seeking software engineering, full-stack, backend, and
              data-focused opportunities.
            </p>
          </div>

          <p className="contact-text">
            I’m interested in roles where I can build reliable applications,
            scalable APIs, and data-driven products while continuing to grow as an
            engineer.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href="mailto:vaishnavikashyap1804@gmail.com">
              <FiMail /> Email Me
            </a>

            <a
              className="btn btn-secondary"
              href="https://www.linkedin.com/in/vaishnavikashyap2001"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin /> LinkedIn
            </a>

            <a
              className="btn btn-secondary"
              href="https://github.com/vaishk1804"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact