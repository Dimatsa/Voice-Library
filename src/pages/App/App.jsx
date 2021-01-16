import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default () => {
  const [message, setMessage] = useState('')

  useEffect(() => fetch('/api/message')
    .then(response => response.json())
    .then(json => setMessage(json)), [])

  return (
    <div className="App">
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
    </div>
  )
}
