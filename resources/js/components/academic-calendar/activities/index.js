import React from 'react'
import Uuid from 'uuid/v4'
import moment from 'moment'
import './style.scss'

const Activity = ({ activity, from, to }) => {
  let fromFormat = moment(from).format('MMM DD')
  let toFormat = moment(to).format('MMM DD')
  return (
    <div className="activity">
      <span className="date">{fromFormat} - {toFormat}</span>
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