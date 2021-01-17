import React from "react";
import styled from "styled-components";
import LogoPanel from "../Login/LogoPanel";

const StyledRightPanel = styled.div`
  .login-title {
    font-family: "Montserrat";
    font-size: 3em;
    display: flex;
    align-items: left;

    color: #ffffff;
    line-height: 3rem;
  }

  .dashboard-subtitle {
    font-family: "Raleway";
    font-size: 1.25em;
    display: flex;
    align-items: top;
    line-height: 2rem;
    justify-content: center;
    color: #efefef;
    background-color: #222222;
  }

  .logo-shrinker {
    margin-top: -4em;
    margin-bottom: -5em;
  }

  .horizontal-line {
    background-color: white;
    width: 50%;
  }

  .horizontal-line-holder {
    background-color: #222222;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
  background-color: #333333;
  height: 100%;
`;

export default () => {
  return (
    <StyledRightPanel>
      <div className="logo-shrinker">
        <LogoPanel />
      </div>
      <p className="dashboard-subtitle">
        By uploading recordings of your voice, your words are saved to your
        account so that they can be played back to you based on the words in the
        text box.
      </p>
      <div className="horizontal-line-holder">
        <hr className="horizontal-line" />
      </div>
    </StyledRightPanel>
  );
};
