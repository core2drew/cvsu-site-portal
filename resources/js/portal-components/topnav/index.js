import React from 'react'
import Logo from '../../components/logo'
import Icon from '../../components/icon'
import './style.scss'

const TopNav = () => (
  <div id="TopNav">
    <div className="sitename">
      <Logo />
      <span className="schoolname">
        <p className="name">Cavite State University Portal</p>
        <p className="branch">Cavity City Campus</p>
      </span>
    </div>
    <div className="menu">
      <img className="profile-image" src="/images/profile/profile_image_placeholder.jpg" />
      <p className="greet">
        Hi, Drew
        <Icon icon="chevron-down"/>
      </p>
    </div>
  </div>
)

export default TopNav