import React from 'react'
import Calendar from 'react-calendar'

const AcademicCalendar = () => {
  let date = new Date();
  let minDate = new Date().setMonth(0, 1)
  let maxDate = new Date().setMonth(11, 31)
  minDate = new Date(minDate)
  maxDate = new Date(maxDate)
  return (
    <div id="AcademicCalendar" className="section">
      <p className="header">Academic Calendar</p>
      <Calendar 
        className="calendar" 
        minDetail={'year'} 
        minDate={minDate} 
        maxDate={maxDate} 
        next2Label={null} 
        prev2Label={null} 
        tileClassName={"calendar-day"}
        value={date}
      />
      <div className="activities">
        <div className="headers">
          <span className="date">Date</span>
          <span className="activity">Activity</span>
        </div>
        <div className="activity">
          <span className="date">Apr 09 - 10</span>
          <span className="activity">Evaluation/ Pre-registration</span>
        </div>
        <div className="activity">
          <span className="date">Apr 09 - 10</span>
          <span className="activity">Evaluation/ Pre-registration</span>
        </div>
        <div className="activity">
          <span className="date">Apr 09 - 10</span>
          <span className="activity">Evaluation/ Pre-registration</span>
        </div>
      </div>
    </div>
  )
}

export default AcademicCalendar