import React, { useReducer, useEffect } from 'react'
import { get, post } from 'Utils'
import Table from 'Components/table'
import Preloader from 'Components/preloader'
import Button from 'Components/button'
import Context from 'Context/users'
import Reducer, { initialState } from 'Reducers/users'
import FormModal from './form-modal'
import TableBody from './tablebody'
import './style.scss'

const Users = () => {
  const url = '/ajax/portal/users'
  const [state, dispatch] = useReducer(Reducer, initialState)
  const tableHeaders = ['First Name', 'Last Name', 'Username', 'Created At', 'Updated At', 'Actions']

  useEffect(() => {
    get(url, {}, res => {
      dispatch({type: "SUCCESS_FETCH", data: res.data})
    }, () => {
      dispatch({type: "ERROR_FETCH"})
      alert('Something went wrong. Please try again')
    })
  },[])

  const handleOpenModal = id => {
    if(id) {
      dispatch({type: 'OPEN_UPDATE_MODAL', id})
    } else {
      dispatch({type: 'OPEN_MODAL'})
    }
  }
  
  return (
    <Context.Provider value={{ state, dispatch, handleOpenModal }}>
    <div id="Users">
      <Preloader variant={'fixed'} isActive={state.isLoading}/>
      <Button 
        text="Add New"
        onClick={() => handleOpenModal()}
      />
      <Table headers={tableHeaders} hasData={!!state.data.length} customTableBody={<TableBody data={state.data}/>} />
      <FormModal />
    </div>
    </Context.Provider>
  )
}

export default Users