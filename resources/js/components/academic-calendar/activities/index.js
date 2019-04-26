import React from 'react'
import Uuid from 'uuid/v4'
import moment from 'moment'
import './style.scss'

const Activity = ({ activity, from, to }) => {
  let _fromDate = moment(from)
  let _toDate = moment(to)
  let daysBetweenDates = _toDate.diff(_fromDate, 'days')
  let isSameMonth = _fromDate.isSame(_toDate, 'month')
  let activityDate = ''
  
  if(isSameMonth) {
    activityDate = _fromDate.format('MMM DD')
    if(daysBetweenDates > 0) {
      activityDate = `${activityDate} - ${_toDate.format('DD')}`
    }
  } else {
    activityDate = `${_fromDate.format('MMM DD')} / ${_toDate.format('MMM DD')}`
  }

  return (
    <div className="activity">
      <span className="date">{activityDate}</span>
      <span className="activity">{activity}</span>
    </div>
  )
}

const Activities = ({ items, hasItems }) => (
  <div className="activities">
    <div className="headers">
      <span className="date">Date</span>
      <span className="activity">Activity</span>
    </div>
    {
      items.map(item => (
        <Activity {...item} key={Uuid()}/>
      ))
    }
    {
      hasItems || (
        <div className="no-data">
          No activity available
        </div>
      )
    }
  </div>
)

export default Activities