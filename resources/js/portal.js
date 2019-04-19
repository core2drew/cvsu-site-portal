import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TopNav, Sidebar } from './portal-components'
const App = () => (
  <Router>
    <TopNav />
    <Sidebar />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));