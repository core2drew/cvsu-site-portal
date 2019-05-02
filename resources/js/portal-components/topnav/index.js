import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import Logo from 'Components/logo'
import Icon from 'Components/icon'
import ProfileModal from 'PortalComponents/profile-modal'
import AccountModal from 'PortalComponents/account-modal'
import Button from 'Components/button'
import CurrentUser from 'Context/current-user'
import './style.scss'

const TopNav = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isProfileModalActive, setProfileModalActive] = useState(false)
  const [isAccountModalActive, setAccountModalActive] = useState(false)
  const currentUserContext = useContext(CurrentUser)

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
          <img className="profile-image" src={displayProfileImage(currentUserContext.profile_image)} />
          <p className="greet">
            Hi, {currentUserContext ? currentUserContext.first_name : ''}
            <Icon icon="chevron-down"/>
          </p>
          <div 
            className={
              classnames('items', {'active': isMenuActive })
            }
          >
            <Button variant={'tertiary item'} text={'Profile'} onClick={() => setProfileModalActive(true)}/>
            <Button variant={'tertiary item'} text={'Account'} onClick={() => setAccountModalActive(true)}/>
            <a href="/auth/logout" className="item">Log out</a>
          </div>
        </div>
      </div>
      <ProfileModal 
        isActive={isProfileModalActive} 
        handleClose={() => setProfileModalActive(false)}
      />
      <AccountModal 
        isActive={isAccountModalActive} 
        handleClose={() => setAccountModalActive(false)}
      />
    </React.Fragment>
  )
}

export default TopNav