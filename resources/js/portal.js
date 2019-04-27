import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNav from 'PortalComponents/topnav'
import Sidebar from 'PortalComponents/sidebar'
import DeanMessage from 'PortalRoutes/dean-message'
import Announcements from 'PortalRoutes/announcements'
import AcademicCalendar from 'PortalRoutes/academic-calendar'
import Students from 'PortalRoutes/students'
import Users from 'PortalRoutes/users'
import NoMatch from 'PortalRoutes/nomatch'
import UserContext from 'Context/user'
import { get } from 'Utils'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    get('/ajax/portal/user', {},  res => setUser(res))
  }, [])

  return (
    <Router>
      <UserContext.Provider value={user}>
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
      </UserContext.Provider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));