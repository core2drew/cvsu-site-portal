import React from 'react'
import { fromToDate } from 'Utils'
import Uuid from 'uuid/v4'
import './style.scss'

const Activity = ({ activity, from, to }) => {
  return (
    <div className="activity">
      <span className="date">{fromToDate(from, to, 'MMM DD', 'DD', 'MMM DD')}</span>
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