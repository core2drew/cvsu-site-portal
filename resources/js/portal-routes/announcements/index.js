import React, { useEffect, useReducer, useState, useRef } from 'react'
import { get, post } from '../../utils'
import Table from '../../components/table'
import Button from '../../components/button'
import Modal from '../../components/modal'
import CKEditor from '../../components/ckeditor'
import Input from '../../components/input'
import Preloader from '../../components/preloader'
import TableBody from './tablebody'
import AnnouncementReducer, { initialState } from '../../reducers/announcements'
import AnnouncementsContext from '../../contexts/announcements'

const Announcements = () => {
  const url = '/ajax/portal/announcements'
  const editorRef = useRef(null)
  const [state, dispatch] = useReducer(AnnouncementReducer, initialState)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const tableHeaders = ['Title', 'Slug', 'Created At', 'Updated At', 'Actions']

  const clearFields = () => {
    setTitle('')
    setSlug('')
    setContent('')
    editorRef.current.setData('')
  }

  const handleSave = () => {
    dispatch({type: 'SAVING'})
    post(
      url, 
      {title, slug, content}, 
      res => dispatch(
        {type: 'SUCCESS_SAVE', data: res.data}
      ),
      () => {
        dispatch({type: "ERROR_SAVE"})
        alert('Something went wrong. Please try again')
      }
    )
    clearFields();
  }

  const handleUpdate = id => {
    post(
      url, 
      {title, slug, content}, 
      res => dispatch(
        {type: 'SUCCESS_SAVE', data: res.data}
      ),
      () => {
        dispatch({type: "ERROR_SAVE"})
        alert('Something went wrong. Please try again')
      }
    )
  }

  const handleDelete = id => {
    dispatch({type: 'DELETING'})
    post(
      url, 
      { id }, 
      res => dispatch(
        {type: 'SUCCESS_DELETE', data: res.data}
      ),
      () => {
        dispatch({type: "ERROR_DELETE"})
        alert('Something went wrong. Please try again')
      },
      'DELETE'
    )
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
    <AnnouncementsContext.Provider value={{handleUpdate, handleDelete}}>
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
    </AnnouncementsContext.Provider>
  )
}

export default Announcements