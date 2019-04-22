import React, { useEffect, useReducer, useRef, useContext } from 'react'
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
  const [state, dispatch] = useReducer(AnnouncementReducer, initialState)
  const titleRef = useRef('')
  const slugRef = useRef('')
  const contentRef = useRef('')
  const tableHeaders = ['Title', 'Slug', 'Author', 'Created At', 'Updated At', 'Actions']
  const userContext = useContext(UserContext)

  const handleSave = () => {
    let title = titleRef.current
    let slug = slugRef.current
    let content = contentRef.current
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
          () => dispatch({type: 'CLOSE_MODAL'})
        }
      >
        <h2 className="section header">New Announcement</h2>
        <Input variant="title" placeholder="Title" onChange={e => titleRef.current = e.target.value}/>
        <Input variant="slug" placeholder="Slug" onChange={e => slugRef.current = e.target.value}/>
        <CKEditor id="Editor" onChange={data => contentRef.current = data}/>
        <Button variant="save" text="Create" onClick={handleSave}/>
      </Modal>
    </div>
  )
}

export default Announcements