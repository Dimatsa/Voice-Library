import React from "react";
import styled from "styled-components";

const StyledRightPanel = styled.div`
  .Login-header {
    background-color: #2f80ed;
    float: right;
    height: 1000px;
    width: 1050px;
    padding: 20px;
    color: #333333;
  }

  .Login-subtitle {
    position: absolute;
    width: 700px;
    height: 112px;
    left: 800px;
    top: 296px;

    font-family: Raleway;
    font-style: sans-serif;
    font-weight: 840;
    font-size: 80px;
    line-height: 80px;
    display: flex;
    align-items: left;

    color: #ffffff;
  }
  background-color: #2f80ed;
  height: 100%;
`;

export default () => {
  return (
    <StyledRightPanel>
      {/* <div className="Login-header"></div>
      <p className="Login-subtitle">YouSpeak, so you don&#39;t have to</p> */}
    </StyledRightPanel>
  );
};
