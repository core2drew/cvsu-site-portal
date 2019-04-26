import React, { useContext } from 'react'
import Modal from 'Components/modal'
import UserContext from 'Context/user'

const ProfileModal = ({ isActive, handleClose }) => {
  const context = useContext(UserContext)
  return (
    <Modal isActive={isActive} handleClose={handleClose}>
      
    </Modal>
  )
}

export default ProfileModal