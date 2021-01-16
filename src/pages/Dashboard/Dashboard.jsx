import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const StyledAppDiv = styled.div`
  text-align: center;

  .App-header {
    background-color: #6fcf97;
    height: 386px;
    padding: 20px;
    color: #333333;
  }

  .App-intro {
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

  .App-subtitle {
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

  input[type="text"] {
    padding: 0;
    height: 30px;
    position: relative;
    left: 0;
    outline: none;
    border: 1px solid #cdcdcd;
    border-color: rgba(0, 0, 0, 0.15);
    background-color: white;
    font-size: 16px;
  }

  .advancedSearchTextbox {
    width: 526px;
    margin-right: -4px;
  }
`;

export default () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <StyledAppDiv>
        <div className="App-header"></div>
        <p className="App-intro">YouSpeak</p>
        <p className="App-subtitle">YouSpeak so you don't have to</p>
        <button>Upload Recording</button>
        <button>Play Audio</button>
        <input type="text" class="advancedSearchTextBox" />
      </StyledAppDiv>
    </>
  );
};
