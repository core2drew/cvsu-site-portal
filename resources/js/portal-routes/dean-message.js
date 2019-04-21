import React, { useEffect, useState, useRef } from 'react'
import { get, post } from '../utils'
import CKEditor from '../components/ckeditor'
import Button from '../components/button'

const DeanMessage = () => {
  const url = '/ajax/portal/dean-message'
  const [initialMessage, setInitialMessage] = useState('')
  const [message, setMessage] = useState('')

  const handleEditor = data => {
    setMessage(data)
  }

  const handleSave = () => {
    post(url, {message}, () => alert('Message Save'), () => alert('Something went wrong'))
  }

  useEffect(() => {
    get(url, {}, res => {
      setMessage(res.message)
      setInitialMessage(res.message)
    })
  },[])

  return (
    <div id="DeanMessage">
      <h2>Dean Message</h2>
      <CKEditor id="Editor" onChange={handleEditor} value={message} initialValue={initialMessage}/>
      <Button text={'Save'} onClick={handleSave} />
    </div>
  )
}

export default DeanMessage