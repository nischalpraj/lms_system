import React from "react";
import "./Award.css";
import badge from "../assets/badges.png";

const Award = () => {
  return (
    <div className="award-div">
      <div className="award-text">
        <div className="award-quote">Every award is a win-for you.</div>
        <div className="award-subquote">
          Awards are good. Results are even better. At Leapforg connect, we aim
          for both.
        </div>
      </div>
      <div className="badge">
        <img src={badge} />
      </div>
      <div className="award-subquote" style={{ marginTop: 38, marginBottom:38 }}>
        "Recognized by leading tech communities as a trusted learning platform."
      </div>
    </div>
  );
};

export default Award;
