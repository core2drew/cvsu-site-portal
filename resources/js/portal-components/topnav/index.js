import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import Logo from '../../components/logo'
import Icon from '../../components/icon'
import { Link } from 'react-router-dom'
import './style.scss'

const TopNav = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  
  const handleMenu = e => {
    e.nativeEvent.stopImmediatePropagation()
    setIsMenuActive(!isMenuActive)
  }

  const closeMenu = () => {
    setIsMenuActive(false)
  }

  useEffect(() => {
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <div id="TopNav">
      <div className="sitename">
        <Logo />
        <span className="schoolname">
          <p className="name">Cavite State University Portal</p>
          <p className="branch">Cavity City Campus</p>
        </span>
      </div>
      <div className="menu" onClick={handleMenu}>
        <img className="profile-image" src="/images/profile/profile_image_placeholder.jpg" />
        <p className="greet">
          Hi, Drew
          <Icon icon="chevron-down"/>
        </p>
        <div 
          className={
            classnames('items', {'active': isMenuActive })
          }
        >
          <Link to="/portal/profile" className="item">Profile</Link>
          <a href="/auth/logout" className="item">Log out</a>
        </div>
      </div>
    </div>
  )
}

export default TopNav