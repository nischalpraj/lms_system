import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/header_logo.png";
import frogie from "../../assets/frogie.png";

const Header = () => {
  return (
    <div>
      <div className="first-part">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" width="121" />
          </div>
          <div className="nav-links">
            <a href="/">For Learners</a>
            <a href="/academics">For Academics</a>
            <a href="/organizations">For Organizations</a>
            <a href="/courses">Course</a>
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
            <div className="main-text">Leap your career like a frog.</div>
            <div className="sub-text">
              Built on industry standards with real-world practice and
              employment-focused learning.
            </div>
            <div className="explore">
              <a href="/courses">Explore courses</a>
            </div>
          </div>
          <div className="first-image">
            <img src={frogie} alt="frog image" width="600px" height="600px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
