import React, { useEffect, useReducer, useRef, useState } from 'react'
import { get, post } from '../../utils'
import Table from '../../components/table'
import Button from '../../components/button'
import Preloader from '../../components/preloader'
import TableBody from './tablebody'
import AnnouncementReducer, { initialState } from '../../reducers/announcements'
import AnnouncementsContext from '../../contexts/announcements'
import FormModal from './form-modal'

const Announcements = () => {
  const url = '/ajax/portal/announcements'
  const editorRef = useRef(null)
  const announcementIdRef = useRef(null)
  const [state, dispatch] = useReducer(AnnouncementReducer, initialState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const tableHeaders = ['Title', 'Created At', 'Updated At', 'Actions']

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

  const handleEdit = id => {
    announcementIdRef.current = id
    dispatch({type: 'OPEN_UPDATE_MODAL'})
    let {title, content} = state.data.filter(d => d.id === id)[0]
    setTitle(title)
    editorRef.current.setData(content)
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
    <AnnouncementsContext.Provider
      value={
        {
          handleEdit, 
          handleDelete, 
          state, 
          dispatch, 
          editorRef,
          announcementIdRef,
          title, 
          setTitle, 
          content, 
          setContent, 
          url
        }
      }
    >
      <div id="Announcements">
        <Preloader variant={'fixed'} isActive={state.isLoading}/>
        <Button 
          text="Add New"
          onClick={
            () => dispatch({type: 'OPEN_MODAL'})
          }
        />
        <Table headers={tableHeaders} hasData={!!state.data.length} customTableBody={<TableBody data={state.data}/>}/>
        <FormModal />
      </div>
    </AnnouncementsContext.Provider>
  )
}

export default Announcements