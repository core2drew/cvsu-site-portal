import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));