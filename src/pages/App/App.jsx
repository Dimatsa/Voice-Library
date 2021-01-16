import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: 'sans-serif';
}
`;

const StyledAppDiv = styled.div`
  text-align: center;

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
  }

  .App-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }

  .App-intro {
    font-size: large;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default () => {
  const [message, setMessage] = useState("");

  useEffect(
    () =>
      axios
        .get("/api/message")
        .then((response) => response.data)
        .then((data) => setMessage(data)),
    []
  );

  return (
    <>
      <GlobalStyle />
      <StyledAppDiv>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <Switch>
              <Route path="/test">
                <h2>{message}</h2>
              </Route>
            </Switch>
          </Router>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </StyledAppDiv>
    </>
  );
};
