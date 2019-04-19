import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TopNav, Sidebar } from './portal-components'
import DeanMessage from './portal-routes/dean-message'
import Announcements from './portal-routes/announcements'
const App = () => (
  <Router>
    <TopNav />
    <Sidebar />
    <div id="Content">
      <Route path="/portal" exact component={DeanMessage} />
      <Route path="/portal/announcements" exact component={Announcements} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));