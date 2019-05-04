import React, { useState } from 'react'
import { post } from 'Utils'
import Button from 'Components/button'
import Modal from 'Components/modal'
import Input from 'Components/input'
import './style.scss'

const SignUpModal = ({ isActive, handleClose }) => {
  
  const [studentNo, setStudentNo] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const clearFields = () => {
    setStudentNo('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSignUp = () => {
    if(!studentNo) {
      alert('Student number is required')
      return
    }

    if(!username) {
      alert('Username is required')
      return
    }

    if(!password || !confirmPassword) {
      alert('Password and confirm password is required')
      return
    }

    if(password !== confirmPassword) {
      alert('Password and confirm password does not match')
      return 
    }

    post(
      '/ajax/portal/signup', 
      { studentNo, username, password, confirmPassword },
      res => {
        if(res.status > 200) {
          alert(res.message)
          return
        }
        handleClose()
        alert(res.message)
        clearFields()
      },
      () => alert('Something went wrong'),
    )
  }

  return (
    <Modal id="SignUpModal" isActive={isActive} handleClose={handleClose}>
      <h3 className="section header">Sign up</h3>
      <div className="fields">
        <Input label={'Student Number'} value={studentNo} onChange={e => setStudentNo(e.target.value)} />
        <Input label={'Username'} value={username} onChange={e => setUsername(e.target.value)} />
        <Input label={'Password'} value={password} onChange={e => setPassword(e.target.value)} type={"password"} />
        <Input label={'Confirm Password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type={"password"} />
        <Button text='Sign Up' onClick={handleSignUp}/>
      </div>
    </Modal>
  )
}

export default SignUpModal