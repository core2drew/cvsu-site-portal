import React from 'react'
import Logo from 'Components/logo'
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
          {/* <ul className="sub-menu">
            <NavLink to="/admission#Hymn" className="item">Requirements</NavLink>
            <NavLink to="/admission#RetentionPolicies" className="item">Retention Policies</NavLink>
            <NavLink to="/admission#CourseOffered" className="item">Course Offered</NavLink>
          </ul> */}
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