import React from 'react'
import Logo from './logo'
import { Link } from 'react-router-dom'

const MainNav = () => (
  <div id="MainNav">
    <div className="container">
      <div className="sitename">
        <Logo/>
        <span className="schoolname">
          <p className="name">Cavite State University</p>
          <p className="branch">Cavite City Campus</p>
        </span>
      </div>
      <ul className="menu">
        <li className="item">
          <Link to="/about">
            About
          </Link>
        </li>
        <li className="item">
          Admission
          <ul className="sub-menu">
            <li className="item">Requirements</li>
            <li className="item">Retention Policies</li>
            <li className="item">Course Offered</li>
          </ul>
        </li>
        <li className="item">
          Facilities
        </li>
        <li className="item">
          Contact
        </li>
      </ul>
    </div>
  </div>
)

export default MainNav