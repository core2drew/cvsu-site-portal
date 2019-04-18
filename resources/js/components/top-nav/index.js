import React from 'react'
import moment from 'moment'
import Icon from '../icon'
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
      <a href="/portal" id="Portal" className="cvsu-btn">
        Portal
        <Icon icon={'lock'} />
      </a>
    </div>
  </div>
)

export default TopNav