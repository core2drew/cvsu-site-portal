import React from 'react'
import moment from 'moment'
import Button from 'Components/button'
import './style.scss'

const TopNav = props => (
  <div id="TopNav">
    <div className="container">
      <div className="detail">
        {moment().format("dddd, MMMM D YYYY")}
      </div>
      <span className="breaker">|</span>
      <div className="detail">
        <label>Telephone No.:</label>
        <span>+63 (46) 481-1990</span>
      </div>
      <span className="breaker">|</span>
      <div className="detail">
        <label>Email:</label>
        <span>info@cvsu-cc.com</span>
      </div>
      <Button id="Portal" onClick={() => window.location.href="/portal"} text="Portal" icon="lock" />
    </div>
  </div>
)

export default TopNav