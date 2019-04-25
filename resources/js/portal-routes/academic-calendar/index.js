import React, { useReducer, useEffect } from 'react'
import { get, post } from 'Utils'
import Table from 'Components/table'
import Button from 'Components/button'
import Preloader from 'Components/preloader'
import Context from 'Context/academic-calendar'
import Reducer, { initialState } from 'Reducers/academic-calendar'
import FormModal from './form-modal'
import TableBody from './tablebody'

const AcademicCalendar = () => {
  const url = '/ajax/portal/academic-calendar'
  const [state, dispatch] = useReducer(Reducer, initialState)
  const tableHeaders = ['Activity', 'From / To', 'Created At', 'Updated At', 'Actions']
  
  useEffect(() => {
    get(url, {}, res => {
      dispatch({type: "SUCCESS_FETCH", data: res.data})
    }, () => {
      dispatch({type: "ERROR_FETCH"})
      alert('Something went wrong. Please try again')
    })
  },[])

  return (
    <Context.Provider value={{ state, dispatch, url }}>
      <div id="AcademicCalendar">
        <Preloader variant={'fixed'} isActive={state.isLoading}/>
        <Button 
          text="Add New"
          onClick={
            () => dispatch({type: 'OPEN_MODAL'})
          }
        />
        <Table headers={tableHeaders} hasData={!!state.data.length} customTableBody={<TableBody data={state.data}/>} />
        <FormModal />
      </div>
    </Context.Provider>
  )
}

export default AcademicCalendar