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
    font-size: 1.5em;
    display: flex;
    align-items: top;
    line-height: 2rem;

    color: #efefef;
  }

  background-color: #333333;
  height: 100%;
`;

export default () => {
  return (
    <StyledRightPanel>
      <LogoPanel />
      <p className="dashboard-subtitle">
        By uploading recordings of your voice, your words are saved to your
        account so that they can be played back to you based on the words in the
        text box.
      </p>
    </StyledRightPanel>
  );
};
