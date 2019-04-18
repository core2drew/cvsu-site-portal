import React from 'react'
import Icon from './icon'
import { Link } from 'react-router-dom'

const SideQuickLinks = props => (
  <div id="SideQuickLinks" className={`sidebar ${props.variant}`}>
    <h3 className="section header">Quick Links</h3>
    <div className="links">
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Admission Requirements</Link>
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Retention Policies</Link>
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Course Offered</Link>
    </div>
  </div>
)

export default SideQuickLinks