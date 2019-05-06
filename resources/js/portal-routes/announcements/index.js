import React, { useEffect, useReducer, useRef, useState } from 'react'
import { get, post } from 'Utils'
import Table from 'Components/table'
import Preloader from 'Components/preloader'
import TableBody from './tablebody'
import AnnouncementReducer, { initialState } from 'Reducers/announcements'
import AnnouncementsContext from 'Context/announcements'
import TableContext from 'Context/table'
import FormModal from './form-modal'
import './style.scss'

const Announcements = () => {
  const url = '/ajax/portal/announcements'
  const editorRef = useRef(null)
  const announcementIdRef = useRef(null)
  const [state, dispatch] = useReducer(AnnouncementReducer, initialState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const tableHeaders = ['Title', 'Created At', 'Updated At', 'Actions']

  useEffect(() => {
    get(url, {}, res => {
      dispatch({type: "SUCCESS_FETCH", data: res.data})
    }, () => {
      dispatch({type: "ERROR_FETCH"})
      alert('Something went wrong. Please try again')
    })
  },[])

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

  const handleChangePage = action => {
    dispatch({type: "FETCHING"})
    get(
      action === 'next' ? state.nextPageUrl : state.prevPageUrl, 
      { searchBy, search }, 
      res => {
        dispatch({
          type: "SUCCESS_FETCH", 
          data: res.data,
          nextPageUrl: res.next_page_url,
          prevPageUrl: res.prev_page_url
        })
      }, 
      () => {
      dispatch({type: "ERROR_FETCH"})
      alert('Something went wrong. Please try again')
    })
  }

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
        <TableContext.Provider value={{ handleChangePage, state }}>
          <Table 
            headers={tableHeaders} 
            hasData={!!state.data.length} 
            customTableBody={<TableBody data={state.data}/>}
            hasAdd={true}
            handleAdd={() => dispatch({type: 'OPEN_MODAL'})}
          />
        </TableContext.Provider>
        <FormModal />
      </div>
    </AnnouncementsContext.Provider>
  )
}

export default Announcements