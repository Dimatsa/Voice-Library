import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import ApiTest from "../ApiTest/ApiTest";

const StyledAppDiv = styled.div`
  text-align: center;
`;

export default () => {
  return (
    <>
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
