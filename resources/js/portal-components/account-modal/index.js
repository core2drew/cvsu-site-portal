import React, { useState, useContext, useEffect } from 'react'
import { post } from 'Utils'
import Modal from 'Components/modal'
import Input from 'Components/input'
import Button from 'Components/button'
import CurrentUser from 'Context/current-user'
import './style.scss'

const AccountModal = ({ isActive, handleClose }) => {
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const context = useContext(CurrentUser)

  useEffect(() => {
    setUsername(context.username)
  }, [context, isActive])

  const handleUpdateUsername = () => {
    if(!username) {
      alert('Username is required')
      return 
    }
    post(
      '/ajax/portal/user', {
        id:context.id,
        username
      },
      () => window.location.reload(),
      () => alert('Something went wrong.'),
      'PATCH'
    )
  }

  const clearPasswordFields = () => {
    setCurrentPassword('')
    setNewPassword('')
    setVerifyPassword('')
  }

  const handleUpdatePassword = () => {
    if(!currentPassword) {
      alert('Current password is required')
      return
    }
    
    if(!newPassword || !verifyPassword) {
      alert('New password and verify password is required')
      return 
    }

    if(newPassword !== verifyPassword) {
      alert('Password does not match')
      return 
    }

    post(
      '/ajax/portal/user/update-password', {
        id:context.id,
        currentPassword,
        newPassword
      },
      res => {
        if(res.message) {
          alert(res.message)
          return
        }
        alert('Password changed.')
        handleClose()
        clearPasswordFields()
      },
      () => alert('Something went wrong.'),
      'PATCH'
    )
  }
  

  return (
    <Modal id="AccountModal" isActive={isActive} handleClose={handleClose}>
      <h3 className="section header">Account</h3>
      <div className="fields">
        <Input label={'Username'} value={username} onChange={e => setUsername(e.target.value)} />
        <Button text={'Update Username'} onClick={handleUpdateUsername}/>
      </div>
      <div className="fields change-password">
        <strong>Change Password</strong>
        <Input label={'Current Password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type={'password'} />
        <Input label={'New Password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} type={'password'} />
        <Input label={'Verify Password'} value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} type={'password'} />
        <Button text={'Update Password'} onClick={handleUpdatePassword}/>
      </div>
    </Modal>
  )
}


export default AccountModal