import React, { useEffect, useState } from 'react'
import Uuid from 'uuid/v4'
import { get } from '../../utils'
import Announcement from './announcement'
import './style.scss'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    get(
      '/ajax/portal/limited/announcements', 
      {limit: 5},
      res => {
        setAnnouncements(res)
      }
    )
  }, [])
  return (
    <div id="Announcements" className="section">
      <p className="section header">Latest Announcements</p>
      { announcements.map(announcement => <Announcement {...announcement} key={Uuid()}/>) }
    </div>
  )
}

export default Announcements