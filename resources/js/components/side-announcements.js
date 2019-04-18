import React from 'react'
import Icon from './icon'
import { Link } from 'react-router-dom'

const SideAnnouncements = props => (
  <div id="SideAnnouncements" className={`sidebar ${props.variant}`}>
    <h3 className="section header">Announcements</h3>
    <div className="links">
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Application for Admission Exam for 1st Semester SY 2019-2020</Link>
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Grade 11 Application for SY 2019-2020</Link>
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Grade 7 Application for SY 2019-2020</Link>
      <Link className="link" to="/"><Icon icon={"caret-right"}/>Deadline of Submission of Requirements for Admission Exam</Link>
    </div>
  </div>
)

SideAnnouncements.defaultProps = {
  variant: ''
}

export default SideAnnouncements