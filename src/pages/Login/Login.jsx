import React from "react";
import styled from "styled-components";

const StyledAppDiv = styled.div`
  text-align: center;

  .Login-header {
    background-color: #6fcf97;
    height: 386px;
    padding: 20px;
    color: #333333;
  }

  .Login-intro {
    position: absolute;
    width: 824px;
    height: 215px;
    left: 620px;
    top: 0px;

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
    position: absolute;
    left: 620px;
    top: 250px;

    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 184px;
    display: flex;
    align-items: center;
    text-align: center;
  }
`;

export default () => {
  return (
    <>
      <StyledAppDiv>
        <div className="Login-header"></div>
        <p className="Login-intro">YouSpeak</p>
        <p className="Login-subtitle">YouSpeak so you don&#39;t have to</p>
        <button>Login</button>
      </StyledAppDiv>
    </>
  );
};
