import React from "react";
import styled from "styled-components";

const StyledRightPanel = styled.div`
  .login-title {
    font-family: "Montserrat";
    font-size: 3em;
    display: flex;
    align-items: left;

    color: #ffffff;
    line-height: 3rem;
  }

  .login-subtitle {
    font-family: "Raleway";
    font-size: 1.5em;
    display: flex;
    align-items: left;
    line-height: 2rem;

    color: #ffffff;
  }

  .login-packed {
    text-align: left;
    width: 45%;
    padding-top: 30%;
    padding-left: 5%;
  }

  background-color: #2f80ed;
  height: 100%;
`;

export default () => {
  return (
    <StyledRightPanel>
      <div className="login-packed">
        <p className="login-title">Your words, our problem.</p>
        <p className="login-subtitle">
          By recording your voice, you have the power of speech ready at your
          fingertips.
        </p>
      </div>
    </StyledRightPanel>
  );
};
