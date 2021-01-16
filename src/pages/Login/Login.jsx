import React from "react";
import styled from "styled-components";

const StyledAppDiv = styled.div`
  .Login-header {
    background-color: #2f80ed;
    float: right;
    height: 1000px;
    width: 1050px;
    padding: 20px;
    color: #333333;
  }

  .button {
    font-size: 13px;
    margin-top: 800px;
    color: #00acf5;
  }

  .Login-intro {
    position: absolute;
    width: 824px;
    height: 215px;
    left: 30px;
    top: 0px;
    color: #e5e5e5;

    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 144px;
    line-height: 184px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .Login-intro2 {
    position: absolute;
    width: 824px;
    height: 215px;
    left: 265px;
    top: 0px;
    color: #5cbbff;

    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 144px;
    line-height: 184px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .Login-subtitle {
    /* YouSpeak, so you don’t have to. */

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
`;

export default () => {
  return (
    <>
      <StyledAppDiv>
        <div className="Login-header"></div>
        <p className="Login-intro">You</p>
        <p className="Login-intro2">Speak</p>
        <p className="Login-subtitle">YouSpeak, so you don&#39;t have to</p>
        <button>Login</button>
      </StyledAppDiv>
    </>
  );
};
