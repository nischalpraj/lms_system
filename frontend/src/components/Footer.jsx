const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .lf-footer {
    background: #ffffff;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    border-top: 1px solid #e5e5e5;
  }

  .lf-footer * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Top section ── */
  .lf-top {
    padding: 48px 80px 16px;
  }

  .lf-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    margin-bottom: 40px;
  }

  .lf-logo-icon {
    width: 20px;
    height: 28px;
  }

  .lf-logo-text {
    font-size: 1.35rem;
    font-weight: 400;
    color: #1a1a1a;
    letter-spacing: -0.02em;
  }

  .lf-logo-text span {
    font-weight: 300;
  }

  /* ── Grid ── */
  .lf-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 48px;
  }

  .lf-brand p.lf-tagline {
    font-size: 0.97rem;
    font-weight: 700;
    color: #111;
    line-height: 1.4;
    margin-bottom: 14px;
    max-width: 320px;
  }

  .lf-brand p.lf-desc {
    font-size: 0.82rem;
    font-weight: 400;
    color: #444;
    line-height: 1.65;
    max-width: 340px;
  }

  .lf-col h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 18px;
  }

  .lf-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .lf-col ul li a {
    font-size: 0.83rem;
    font-weight: 400;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
  }

  .lf-col ul li a:hover {
    color: #3ab54a;
  }

  /* Social icons */
  .lf-social-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .lf-social-list li a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.83rem;
    font-weight: 400;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
  }

  .lf-social-list li a:hover {
    color: #3ab54a;
  }

  .lf-social-list li a svg {
    flex-shrink: 0;
  }

  /* ── Bottom bar ── */
  .lf-bottom {
    border-top: 1px solid #e0e0e0;
    padding: 20px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .lf-policy-links {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 20px;
    padding: 0 80px;
  }

  .lf-policy-links a {
    font-size: 0.78rem;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
  }

  .lf-policy-links a:hover {
    color: #3ab54a;
  }

  .lf-copyright {
    font-size: 0.78rem;
    color: #555;
  }

  .lf-bottom-logo {
    display: flex;
    align-items: center;
    gap: 4px;
    text-decoration: none;
  }

  .lf-bottom-logo svg {
    width: 18px;
    height: 18px;
  }

  .lf-bottom-logo-text {
    font-size: 1.05rem;
    font-weight: 300;
    color: #1a1a1a;
    letter-spacing: -0.01em;
  }

  @media (max-width: 900px) {
    .lf-top { padding: 40px 24px 16px; }
    .lf-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .lf-policy-links { padding: 0 24px; flex-wrap: wrap; gap: 16px; }
    .lf-bottom { padding: 20px 24px; }
  }

  @media (max-width: 560px) {
    .lf-grid { grid-template-columns: 1fr; }
  }
`;

// SVG Icons
const IconEmail = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LeapfrogIcon = () => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L0 8L4 10L0 14L10 28L20 14L16 10L20 8L10 0Z" fill="#c6e835" />
    <path d="M10 4L3 10L10 24L17 10L10 4Z" fill="#3ab54a" />
  </svg>
);

const LeapfrogBottomIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L0 8L4 10L0 14L10 28L20 14L16 10L20 8L10 0Z" fill="#c6e835" />
    <path d="M10 4L3 10L10 24L17 10L10 4Z" fill="#3ab54a" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="lf-footer">
        {/* Top */}
        <div className="lf-top">
          <a href="/" className="lf-logo">
            <LeapfrogIcon />
            <span className="lf-logo-text">
              Leapfrog <span>Connect</span>
            </span>
          </a>

          <div className="lf-grid">
            {/* Brand */}
            <div className="lf-brand">
              <p className="lf-tagline">
                Leapfrog Connect empowers next generation of IT talents.
              </p>
              <p className="lf-desc">
                With Industry standard training, hands-on experience, and
                employment ready preparation Leapfrog Connect adds value to what
                you have learned in academics and prepare you for the
                international job market.
              </p>
            </div>

            {/* Connect */}
            <div className="lf-col">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="/learners">for Learners</a>
                </li>
                <li>
                  <a href="/academics">for Academics</a>
                </li>
                <li>
                  <a href="/enterprises">for Enterprises</a>
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div className="lf-col">
              <h4>Courses</h4>
              <ul>
                <li>
                  <a href="/courses/data-engineering">Data Engineering</a>
                </li>
                <li>
                  <a href="/courses/devops">DevOps</a>
                </li>
              </ul>
            </div>

            {/* Contact us */}
            <div className="lf-col">
              <h4>Contact us</h4>
              <ul className="lf-social-list">
                <li>
                  <a href="mailto:connect@leapfrog.com">
                    <IconEmail /> Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer">
                    <IconFacebook /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer">
                    <IconInstagram /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer">
                    <IconLinkedIn /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Policy links */}
        <div className="lf-policy-links">
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/data-policy">Data Policy</a>
        </div>

        {/* Bottom bar */}
        <div className="lf-bottom">
          <p className="lf-copyright">
            Copyright 2026, Leapfrog Connect. All rights reserved.
          </p>
          <a
            href="https://leapfrogtechnology.com"
            target="_blank"
            rel="noreferrer"
            className="lf-bottom-logo">
            <LeapfrogBottomIcon />
            <span className="lf-bottom-logo-text">leapfrog</span>
          </a>
        </div>
      </footer>
    </>
  );
}
