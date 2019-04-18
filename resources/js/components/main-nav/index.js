import React from 'react'
import Logo from '../logo'
import { Link, NavLink } from 'react-router-dom'
import './style.scss'

const MainNav = () => (
  <div id="MainNav">
    <div className="container">
      <Link to="/" className="sitename">
        <Logo/>
        <span className="schoolname">
          <p className="name">Cavite State University</p>
          <p className="branch">Cavite City Campus</p>
        </span>
      </Link>
      <ul className="menu">
        <NavLink className="item" to="/about">
          About
        </NavLink>
        <NavLink className="item" to="/admission">
          Admission
          <ul className="sub-menu">
            <li className="item">Requirements</li>
            <li className="item">Retention Policies</li>
            <li className="item">Course Offered</li>
          </ul>
        </NavLink>
        <NavLink className="item" to="/facilities">
          Facilities
        </NavLink>
        <li className="item">
          Contact
        </li>
      </ul>
    </div>
  </div>
)

export default MainNav