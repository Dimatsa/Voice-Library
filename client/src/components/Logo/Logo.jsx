import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  .logo-words {
    font-family: "Rajdhani";
    display: flex;
  }

  .left-word {
    color: white;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .right-word {
    color: #5cbbff;
  }

  display: flex;
`;

export default () => {
  return (
    <StyledLogo>
      <span className="logo-words">
        <p className="left-word">You</p>
        <p className="right-word">Speak</p>
      </span>
    </StyledLogo>
  );
};
