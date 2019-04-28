import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import Logo from 'Components/logo'
import Icon from 'Components/icon'
import ProfileModal from 'PortalComponents/profile-modal'
import Button from 'Components/button'
import UserContext from 'Context/user'
import './style.scss'

const TopNav = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isProfileModalActive, setProfileModalActive] = useState(false)
  
  const userContext = useContext(UserContext)

  const handleMenu = e => {
    e.nativeEvent.stopImmediatePropagation()
    setIsMenuActive(!isMenuActive)
  }

  const closeMenu = () => {
    setIsMenuActive(false)
  }

  const displayProfileImage = image => image ? `/storage/${image}` : '/images/profile/profile_image_placeholder.jpg'

  useEffect(() => {
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <React.Fragment>
      <div id="TopNav">
        <div className="sitename">
          <Logo />
          <span className="schoolname">
            <p className="name">Cavite State University Portal</p>
            <p className="branch">Cavity City Campus</p>
          </span>
        </div>
        <div className="menu" onClick={handleMenu}>
          <img className="profile-image" src={displayProfileImage(userContext.profile_image)} />
          <p className="greet">
            Hi, {userContext ? userContext.first_name : ''}
            <Icon icon="chevron-down"/>
          </p>
          <div 
            className={
              classnames('items', {'active': isMenuActive })
            }
          >
            <Button variant={'tertiary item'} text={'Profile'} onClick={() => setProfileModalActive(true)}/>
            <a href="/auth/logout" className="item">Log out</a>
          </div>
        </div>
      </div>
      <ProfileModal 
        isActive={isProfileModalActive} 
        handleClose={() => setProfileModalActive(false)}
      />
    </React.Fragment>
  )
}

export default TopNav