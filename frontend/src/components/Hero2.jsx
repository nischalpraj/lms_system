import React from "react";
import "./Hero2.css";
import img from "../assets/img.png";
import admin from "../assets/admin.png";
import customerservice from "../assets/customer-service.png";
import Button from "./Button";

const Hero2 = () => {
  return (
    <div className="key-container">
      <div className="content">
        <div className="upper-text">
          Learning experiences that convert on a platform that scales with you
        </div>
        <div className="lower-text">
          Whether you’re selling your personal expertise, scaling an academy, or
          using online education to expand your company’s revenue, Leapfrog
          connect equips you with the tools and support you need. Create lasting
          value, engage with audiences, generate recurring revenue, and evolve
          your business at every stage.
        </div>
      </div>
      <div className="main-div">
        <div className="div-1">
          <div className="img-div">
            <img src={img} width="420px" />
          </div>
          <div className="text-div1">
            <div className="text-1">
              Build job-ready skills with guided learning
            </div>
            <div className="text-2">
              Learn at your own pace with expertly designed courses and
              structured learning paths. Track your progress, reinforce key
              concepts, and gain practical skills aligned with real-world
              outcomes.
            </div>
            <div className="explore-btn1">
              <Button text="Browse courses" />
            </div>
          </div>
        </div>
        <div className="div-2">
          <div className="img-div">
            <img src={admin} width="420px" />
          </div>
          <div className="text-div2">
            <div className="text-1">
              Manage training and measure impact at scale
            </div>
            <div className="text-2">
              Deliver targeted learning programs, monitor progress across teams,
              and evaluate outcomes with detailed insights. Empower your
              organization with tools designed to support continuous skill
              development
            </div>
            <div className="explore-btn2">
              <Button text="Explore admin tools" color="#F59E0B" />
            </div>
          </div>
        </div>
        <div className="div-3">
          <div className="img-div3">
            <img src={customerservice} width="420px"></img>
          </div>
          <div className="text-div3">
            <div className="text-1_3">Unrivaled customer support</div>
            <div className="text-2">
              From onboarding to issue resolution, our team is here to support
              your growth at every step. We ensure fast, reliable help so you
              can stay focused on learning and results.
            </div>
            <div className="explore-btn3">
              <Button text="Learn more" color="#3a3a3a"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
