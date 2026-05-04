import React from "react";
import icon from "../../assets/icon-quote.svg";
import "./Hero3.css";
import Review from "./Review";

const Hero3 = () => {
  return (
    <div className="big-div">
      <div className="icon-quote">
        <img src={icon} width="100px" />
      </div>
      <div className="quote">Proof, not promises</div>
      <div className="Review">
        <Review />
      </div>
    </div>
  );
};

export default Hero3;
