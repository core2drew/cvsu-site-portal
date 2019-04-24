import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import Modal from 'Components/modal'
import Button from 'Components/button'
import Input from 'Components/input'
import Context from 'Context/academic-calendar'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const FormModal = () => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const {state, dispatch} = useContext(Context)

  const handleChangeStart = (e) => (
    setStartDate(e)
  )

  const handleChangeEnd = (e) => (
    setEndDate(e)
  )
  
  return (
    <Modal 
      isActive={state.isModalActive}
      handleClose={() => dispatch({type: 'CLOSE_MODAL'})}
    >
      <h2 className="section header">New Activity</h2>
      <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeStart}
          showDisabledMonthNavigation 
      />

      <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeEnd}
          showDisabledMonthNavigation 
      />
      <Input variant="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
      {
        state.isUpdateModal ? <Button text="Update" /> : <Button text="Create" />
      }
    </Modal>
  )
}

export default FormModal