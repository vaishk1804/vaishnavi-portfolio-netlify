import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

const EMAIL = 'vaishnavikashyap1804@gmail.com'

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      className={`copy-email-btn${copied ? ' copy-email-btn--copied' : ''}`}
      onClick={handleCopy}
      title="Copy email address"
    >
      {copied ? <FiCheck /> : <FiCopy />}
      {copied ? 'Copied!' : 'Copy email'}
    </button>
  )
}

function Contact() {
  return (
    <section className="section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-photo-card card">
            <img src="/profile.jpg" alt="Vaishnavi Kashyap" className="contact-photo" />
          </div>

          <div className="contact-card card">
            <div className="section-title">
              <p className="eyebrow">Contact</p>
              <h2>Let's connect</h2>
              <p className="section-subtitle">
                Seeking software engineering, full-stack, backend, and data-driven new grad opportunities.
              </p>
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <span className="availability-dot">Open to opportunities · May 2026</span>
            </div>

            <p className="contact-text">
              I'm interested in roles where I can build reliable applications, scalable APIs,
              and intelligent products while continuing to grow across engineering, analytics,
              and ML-adjacent work. I thrive in environments that value technical craft and
              real product outcomes.
            </p>

            {/* Email row with copy button */}
            <div className="email-row">
              <span className="email-display">
                <FiMail />
                {EMAIL}
              </span>
              <CopyEmailButton />
            </div>

            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
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
      </div>
    </section>
  )
}

export default Contact