import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TopNav, Sidebar } from './portal-components'
import DeanMessage from './portal-routes/dean-message'
import Announcements from './portal-routes/announcements'
import AcademicCalendar from './portal-routes/academic-calendar'
import Students from './portal-routes/students'
import Users from './portal-routes/users'
import NoMatch from './portal-routes/nomatch'

const App = () => (
  <Router>
    <TopNav />
    <Sidebar />
    <div id="Content">
      <Switch>
        <Route path="/portal" exact component={DeanMessage} />
        <Route path="/portal/announcements" exact component={Announcements} />
        <Route path="/portal/academic-calendar" exact component={AcademicCalendar} />
        <Route path="/portal/students" exact component={Students} />
        <Route path="/portal/users" exact component={Users} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));