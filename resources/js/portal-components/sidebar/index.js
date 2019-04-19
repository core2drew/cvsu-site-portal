import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'

const Sidebar = props => (
  <div id="Sidebar" className={props.variant}>
    <NavLink exact to="/portal" className="link">Dean Message</NavLink>
    <NavLink exact to="/portal/announcements" className="link">Announcements</NavLink>
    <NavLink exact to="/portal/academic-calendar" className="link">Academic Calendar</NavLink>
    <NavLink exact to="/portal/students" className="link">Students</NavLink>
    <NavLink exact to="/portal/users" className="link">Users</NavLink>
  </div>
)

export default Sidebar