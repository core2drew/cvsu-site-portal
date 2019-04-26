import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import Modal from 'Components/modal'
import Button from 'Components/button'
import Input from 'Components/input'
import Context from 'Context/academic-calendar'
import DatePicker from 'react-datepicker'

const FormModal = () => {
  const [activity, setActivity] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const {state, dispatch, handleAdd, handleUpdate} = useContext(Context)

  const handleDateRangeOnChange =({start, end}) => {
    let _startDate = start || startDate
    let _endDate = end || endDate || start
    moment(_startDate).isAfter(_endDate) && (_endDate = _startDate)
    setStartDate(_startDate)
    setEndDate(_endDate)
  }

  const handleChangeStart = start => handleDateRangeOnChange({start})
  const handleChangeEnd = end => handleDateRangeOnChange({end})

  useEffect(() => {
    if(state.selectedId) {
      const {activity, from, to} = state.data.filter(d => d.id === state.selectedId)[0]
      setActivity(activity)
      setStartDate(moment(from).toDate())
      setEndDate(moment(to).toDate())
    }
  }, [state.selectedId])
  
  return (
    <Modal 
      isActive={state.isModalActive}
      handleClose={() => dispatch({type: 'CLOSE_MODAL'})}
    >
      <h2 className="section header">{state.modalHeaderTitle}</h2>
      
      <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          minDate={moment().toDate()}
          endDate={endDate}
          onChange={handleChangeStart}
          placeholderText="From"
      />

      <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          minDate={startDate || moment().toDate()}
          endDate={endDate}
          onChange={handleChangeEnd}
          placeholderText="To"
      />
      <Input variant="title" placeholder="Activity" value={activity} onChange={e => setActivity(e.target.value)}/>
      {
        state.isUpdateModal ? 
          <Button text="Update" onClick={() => handleUpdate(state.selectedId, activity, startDate, endDate)}/> : 
          <Button text="Add Activity" onClick={() => handleAdd(activity, startDate, endDate)}/>
      }
    </Modal>
  )
}

export default FormModal