import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'

const Sidebar = props => (
  <div id="Sidebar" className={props.variant}>
    <NavLink to="/">Dean Message</NavLink>
    <NavLink to="/">Announcements</NavLink>
    <NavLink to="/">Academic Calendar</NavLink>
    <NavLink to="/">Students</NavLink>
    <NavLink to="/">Users</NavLink>
  </div>
)

export default Sidebar