import React from "react";
import "./Footer.css";
import leapfrog from "../../assets/footer_connect_logo.svg"

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

const LeapfrogIcon = () => <img src={leapfrog} />;

export default function Footer() {
  return (
    <footer className="lf-footer">
      {/* Top */}
      <div className="lf-top">
        <a href="/" className="lf-logo">
          <LeapfrogIcon />
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
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
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
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
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
          <img src={leapfrog} width="168px" />
        </a>
      </div>
    </footer>
  );
}
