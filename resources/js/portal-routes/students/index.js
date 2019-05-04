import React, { useReducer, useEffect } from 'react'
import { get, post } from 'Utils'
import Table from 'Components/table'
import Preloader from 'Components/preloader'
import Button from 'Components/button'
import Context from 'Context/students'
import Reducer, { initialState } from 'Reducers/students'
import FormModal from './form-modal'
import TableBody from './tablebody'
import './style.scss'

const Students = props => {
  const url = '/ajax/portal/students'
  const [state, dispatch] = useReducer(Reducer, initialState)
  const tableHeaders = ['First Name', 'Last Name', 'Username', 'Created At', 'Updated At', 'Actions']

  useEffect(() => {
    // get(url, {}, res => {
    //   dispatch({type: "SUCCESS_FETCH", data: res.data})
    // }, () => {
    //   dispatch({type: "ERROR_FETCH"})
    //   alert('Something went wrong. Please try again')
    // })
  },[])

  const handleOpenModal = id => {
    if(id) {
      dispatch({type: 'OPEN_UPDATE_MODAL', id})
    } else {
      dispatch({type: 'OPEN_MODAL'})
    }
  }

  const handleAdd = (firstName, lastName, username, password) => {
    dispatch({type: 'SAVING'})
    post(url, {
      firstName,
      lastName,
      username,
      password
    },
    res => {
      if(res.status > 200) {
        dispatch({type: "ERROR_SAVE"})
        alert(res.message)
        return
      }
      dispatch({type: 'SUCCESS_SAVE', data: res.data})
    },
    () => {
      dispatch({type: "ERROR_SAVE"})
      alert('Something went wrong. Please try again')
    })
  }

  const handleDelete = id => {
    dispatch({type: 'DELETING'})
    post(
      url, 
      { 
        id
      }, 
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

  const handleUpdate = (id, firstName, lastName, username, password) => {
    dispatch({type: 'UPDATING'})
    post(
      url, 
      {id, firstName, lastName, username, password}, 
      res => {
        if(res.status > 200) {
          dispatch({type: "ERROR_SAVE"})
          alert(res.message)
          return
        }
        dispatch({type: 'SUCCESS_UPDATE', data: res.data})
      },
      () => {
        dispatch({type: "ERROR_UPDATE"})
        alert('Something went wrong. Please try again')
      },
      'PATCH'
    )
  }

  return (
    <Context.Provider value={{ state, dispatch, handleOpenModal, handleAdd, handleDelete, handleUpdate }}>
    <div id="Students">
      <Preloader variant={'fixed'} isActive={state.isLoading}/>
      {/* <Button 
        text="Add New"
        onClick={() => handleOpenModal()}
      /> */}
      <Table headers={tableHeaders} hasData={!!state.data.length} customTableBody={<TableBody data={state.data}/>} />
      <FormModal />
    </div>
    </Context.Provider>
  )
}

export default Students