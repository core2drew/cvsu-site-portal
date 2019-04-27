import React, { useContext } from 'react'
import Modal from 'Components/modal'
import UserContext from 'Context/user'
import './style.scss'

const ProfileModal = ({ isActive, handleClose }) => {
  const context = useContext(UserContext)
  return (
    <Modal id={'ProfileModal'} isActive={isActive} handleClose={handleClose}>
      
    </Modal>
  )
}

export default ProfileModal