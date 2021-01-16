import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default () => {
  const [message, setMessage] = useState('')

  useEffect(() => fetch('/api/message')
    .then(response => response.json())
    .then(json => setMessage(json)), [])

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{message}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  )
}
