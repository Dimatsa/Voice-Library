import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import ApiTest from "../ApiTest/ApiTest";
import "bootstrap/dist/css/bootstrap.min.css";
import Helmet from "react-helmet";

const StyledAppDiv = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333333;
`;

const GlobalStyle = createGlobalStyle`
body {
  margin: 0px;
}
`;

export default () => {
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <meta charSet="utf-8" />
        <title>YouSpeak</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Raleway"
        />
      </Helmet>
      <StyledAppDiv>
        <Router>
          <Switch>
            <Route exact path="/apitest">
              <ApiTest />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </StyledAppDiv>
    </>
  );
};
