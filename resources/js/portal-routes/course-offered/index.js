import React, { useEffect, useState } from 'react'
import { get, post } from 'Utils'
import CKEditor from 'Components/ckeditor'
import Button from 'Components/button'
import Preloader from 'Components/preloader'
import './style.scss'

const CourseOffered = () => {
  const url = '/ajax/portal/course-offered'
  const [isLoading, setIsLoading] = useState(true)
  const [initialContent, setInitialContent] = useState('')
  const [content, setContent] = useState('')

  const handleEditor = data => {
    setContent(data)
  }

  const handleSave = () => {
    post(
      url, 
      {content}, 
      () => alert('Content Save'), 
      () => alert('Something went wrong')
    )
  }

  useEffect(() => {
    get(url, {}, res => {
      setContent(res.content)
      setInitialContent(res.content)
      setIsLoading(false)
    }, () => {
      alert('Something went wrong. Please try again')
      setIsLoading(false)
    })
  },[])

  return (
    <div id="CourseOffered">
      <Preloader variant={'fixed'} isActive={isLoading}/>
      <CKEditor id="Editor" onChange={handleEditor} value={content} initialValue={initialContent}/>
      <Button id="Save" text={'Save'} onClick={handleSave} />
    </div>
  )
}

export default CourseOffered