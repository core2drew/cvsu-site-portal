import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TopNav, Sidebar } from './portal-components'
import DeanMessage from './portal-routes/dean-message'
import Announcements from './portal-routes/announcements'
import AcademicCalendar from './portal-routes/academic-calendar'
import Students from './portal-routes/students'
import Users from './portal-routes/users'
import NoMatch from './portal-routes/nomatch'
import UserContext from './contexts/user-context'
import { get } from './utils'

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