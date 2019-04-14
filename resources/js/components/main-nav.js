import React from 'react'
import Logo from './logo'

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
          About
          <ul className="menu">
            <li className="item">Mission and Vision</li>
            <li className="item">CvSU Hymn</li>
          </ul>
        </li>
        <li className="item">
          Admission
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