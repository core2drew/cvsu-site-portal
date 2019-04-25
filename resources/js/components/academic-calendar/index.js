import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from 'Utils'
import DatePicker from 'react-datepicker'
import Activities from './activities'
import './style.scss'

const AcademicCalendar = () => {
  const url = '/ajax/portal/academic-calendar'
  const [activities, setActivities] = useState([])
  const [currentMonth, setCurrentMonth] = useState(moment().format('M')) 
  const handleOnChange = date => {
    setCurrentMonth(moment(date).format('M'))
  }
  
  useEffect(() => {
    get(
      url, 
      { isFromHomePage: true, currentMonth }, 
      res => {
        setActivities(res)
      }, 
      () => {
        alert('Something went wrong. Please try again')
      }
    )
  }, [currentMonth])

  return (
    <div id="AcademicCalendar" className="section">
      <p className="section header">Academic Calendar</p>
      <DatePicker
        inline
        selected={moment().toDate()}
        onMonthChange={handleOnChange}
      />
      <Activities hasItems={!!activities.length} items={activities}/>
    </div>
  )
}

export default AcademicCalendar