import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Body } from './template';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Body></Body>
      </Router>
    );
  }
}

export default App;
