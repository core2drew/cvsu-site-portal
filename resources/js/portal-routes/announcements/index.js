import React, { useEffect, useReducer, useState, useContext, useRef } from 'react'
import { get, post } from '../../utils'
import Table from '../../components/table'
import Button from '../../components/button'
import Modal from '../../components/modal'
import CKEditor from '../../components/ckeditor'
import Input from '../../components/input'
import Preloader from '../../components/preloader'
import TableBody from './tablebody'
import AnnouncementReducer, { initialState } from '../../reducers/announcements'
import UserContext from '../../contexts/user-context'

const Announcements = () => {
  const url = '/ajax/portal/announcements'
  const editorRef = useRef(null)
  const [state, dispatch] = useReducer(AnnouncementReducer, initialState)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const tableHeaders = ['Title', 'Slug', 'Author', 'Created At', 'Updated At', 'Actions']
  const userContext = useContext(UserContext)

  const clearFields = () => {
    setTitle('')
    setSlug('')
    setContent('')
    editorRef.current.setData('')
  }

  const handleSave = () => {
    let userId = userContext.id
    dispatch({type: 'SAVING'})
    post(
      url, 
      {title, slug, content, userId}, 
      res => dispatch(
        {type: 'SUCCESS_SAVE', data: res.data}
      ),
      () => dispatch({type: "ERROR_SAVE"})
    )
    clearFields();
  }

  useEffect(() => {
    get(url, {}, res => {
      dispatch({type: "SUCCESS_FETCH", data: res.data})
    }, () => {
      dispatch({type: "ERROR_FETCH"})
      alert('Something went wrong. Please try again')
    })
  },[])

  return (
    <div id="Announcements">
      <Preloader variant={'fixed'} isActive={state.isLoading}/>
      <Button 
        text="Add New"
        onClick={
          () => dispatch({type: 'OPEN_MODAL'})
        }
      />
      <Table headers={tableHeaders} customTableBody={<TableBody data={state.data}/>}/>
      <Modal 
        isActive={state.isModalActive} 
        handleClose={
          () => {
            dispatch({type: 'CLOSE_MODAL'})
            clearFields()
          }
        }
      >
        <h2 className="section header">New Announcement</h2>
        <Input variant="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
        <Input variant="slug" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)}/>
        <CKEditor id="Editor" getEditorRef={editor => editorRef.current = editor} onChange={data => setContent(data)}/>
        <Button variant="save" text="Create" onClick={handleSave}/>
      </Modal>
    </div>
  )
}

export default Announcements