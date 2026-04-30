import React from "react";
import "./Header.css";
import logo from "../assets/header_logo.png";

const Header = () => {
  return (
    <div className="top-part">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Logo" width="121" />
        </div>
        <div className="nav-links">
          <a href="/">for learners</a>
          <a href="/academics">for academics</a>
          <a href="/organizations">for organizations</a>
        </div>
        <div className="auth-links">
          <div className="login">
            <a href="/login">Login</a>
          </div>
          <div className="demo">
            <a href="/demo">Request a Demo</a>
          </div>
          <div className="Signup">
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
      <div className="text-img">
        <div className="Text">
          <div className="main-text">
            Leap your career like a frog.
          </div>
          <div className="sub-text">
            Built on industry standards with real-world practice and
            employment-focused learning.
          </div>
        </div>
        <div className="first-image"></div>
      </div>
    </div>
  );
};

export default Header;
