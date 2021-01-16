import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";

const StyledAppDiv = styled.div`
  text-align: center;
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
      <StyledAppDiv>
        <Router>
          <Switch>
            <Route exact path="/apitest">
              <h2>{message}</h2>
            </Route>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
          </Switch>
        </Router>
      </StyledAppDiv>
    </>
  );
};
