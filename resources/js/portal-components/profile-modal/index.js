import React, { useContext, useState, useEffect } from 'react'
import Uuid from 'uuid/v4'
import { post, updateProfileImage } from 'Utils'
import Button from 'Components/button'
import Modal from 'Components/modal'
import Input from 'Components/input'
import FileInput from 'Components/file-input'
import UserContext from 'Context/user'
import './style.scss'

const ProfileModal = ({ isActive, handleClose }) => {
  const reader = new FileReader()
  const context = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  reader.onload = e =>{
    setProfileImage(e.target.result)  // get loaded data and render thumbnail.
  };

  useEffect(() => {
    setFirstName(context.first_name)
    setLastName(context.last_name)
    setProfileImage(context.profile_image)
  }, [context, isActive])

  useEffect(() => {
    
  },[])

  const handleUpdate = () => {
    const id = context.id
    post(
      '/ajax/portal/user', 
      { id, firstName, lastName },
      () => window.location.reload(),
      () => alert('Something went wrong'),
      'PATCH'
    )
  }

  const displayProfileImage = image => image ? `/storage/${image}` : '/images/profile/profile_image_placeholder.jpg'

  const handleProfileImage = e => {
    const image = e.target.files[0]
    updateProfileImage(
      {
        id: context.id, 
        image
      },
      res => {
        setProfileImage(res.profile_image)
        window.location.reload()
      },
      () => alert('Something went wrong')
    )
    reader.readAsDataURL(image);
  }

  return (
    <Modal id={'ProfileModal'} isActive={isActive} handleClose={handleClose}>
      <h3 className="section header">Profile</h3>
      <div className="fields profile">
        <div className="profile-image">
          <img src={displayProfileImage(profileImage)} />
          <span className="hover" onClick={() => document.getElementById('ChooseImage').click()}>Choose Image</span>
        </div>
        <FileInput id='ChooseImage' accept='.jpg, .jpeg, .png' onChange={handleProfileImage}/>
      </div>
      <div className="fields">
        <Input label={'First Name'} value={firstName} onChange={e => setFirstName(e.target.value)} key={Uuid()}/>
        <Input label={'Last Name'} value={lastName} onChange={e => setLastName(e.target.value)} key={Uuid()}/>
      </div>
      <Button text='Update Profile' onClick={handleUpdate}/>
    </Modal>
  )
}

export default ProfileModal