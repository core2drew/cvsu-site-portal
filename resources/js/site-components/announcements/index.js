import React, { useEffect, useState } from 'react'
import Uuid from 'uuid/v4'
import Button from '../button'
import { get } from '../../utils'
import Announcement from './announcement'
import './style.scss'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [nextPageURL, setNextPageURL] = useState(null)

  useEffect(() => {
    get(
      '/ajax/portal/limited/announcements', 
      {},
      res => {
        setNextPageURL(res.next_page_url)
        setAnnouncements(res.data)
      }
    )
  }, [])

  const handleLoadMore = () => {
    get(
      nextPageURL, 
      {},
      res => {
        setNextPageURL(res.next_page_url)
        setAnnouncements([
          ...announcements,
          ...res.data
        ])
      }
    )
  }

  return (
    <div id="Announcements" className="section">
      <p className="section header">Latest Announcements</p>
      { announcements.map(announcement => <Announcement {...announcement} key={Uuid()}/>) }
      <Button id="LoadMoreAnnouncements" variant={'tertiary'} text="Load More Announcements" onClick={handleLoadMore} isVisible={nextPageURL}/>
    </div>
  )
}

export default Announcements