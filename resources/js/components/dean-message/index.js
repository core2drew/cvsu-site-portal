import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from '../../utils'
import './style.scss'

const DeanMessage = () => {
  const [deanMessage, setDeanMessage] = useState(null)
  useEffect(() => {
    if(!deanMessage) {
      get('/ajax/portal/dean-message', {}, res => {
        setDeanMessage(res)
      })
    }
  })

  return (
    <div id="DeanMessage" className="section">
      <p className="section header">Message from the Dean</p>
      <div className="message-container">
        <div className="header">
          <p className="post-date">Posted Date: {deanMessage && moment(deanMessage.created_at).format('MMMM DD, YYYY')}</p>
        </div>
        <p className="message" dangerouslySetInnerHTML={{
          __html: deanMessage && deanMessage.message
        }} />
      </div>
    </div>
  )
}

export default DeanMessage