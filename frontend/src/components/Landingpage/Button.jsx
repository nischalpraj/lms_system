import React from "react";
import styled from "styled-components";

const Button = ({ text = "Click Me", color = "#7808d0" }) => {
  return (
    <StyledWrapper>
      <button className="button" style={{ "--clr": color }}>
        <span className="button__icon-wrapper">
          <svg
            viewBox="0 0 14 15"
            fill="none"
            width={10}
            className="button__icon-svg">
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            width={10}
            className="button__icon-svg button__icon-svg--copy">
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            />
          </svg>
        </span>
        {text}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    line-height: 1;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--clr);
    color: #fff;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    width: 25px;
    height: 25px;
    position: relative;
    color: var(--clr);
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #000;
  }

  .button:hover .button__icon-wrapper {
    color: #000;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transform: translate(150%, -150%);
    transition: transform 0.3s ease-in-out;
  }

  .button:hover .button__icon-svg--copy {
    transform: translate(0);
    transition: transform 0.3s ease-in-out 0.1s;
  }
`;

export default Button;
