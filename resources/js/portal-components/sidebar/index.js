import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import CurrentUser from 'Context/current-user'
import './style.scss'

const Sidebar = props => {
  const currentUserContext = useContext(CurrentUser)
  
  return (
    <div id="Sidebar" className={props.variant}>
      <NavLink exact to="/portal" className="link">Dean Message</NavLink>
      <NavLink exact to="/portal/announcements" className="link">Announcements</NavLink>
      <NavLink exact to="/portal/academic-calendar" className="link">Academic Calendar</NavLink>
      <NavLink exact to="/portal/requirements" className="link">Requirements</NavLink>
      <NavLink exact to="/portal/retention-policies" className="link">Retention Policies</NavLink>
      <NavLink exact to="/portal/course-offered" className="link">Course Offered</NavLink>
      <NavLink exact to="/portal/students" className="link">Students</NavLink>
      {
        currentUserContext.type === 0 && <NavLink exact to="/portal/users" className="link">Users</NavLink>
      }
    </div>
  )
}

export default Sidebar