import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from 'Utils'

const CourseOffered = () => {
  const [couseOffered, setCourseOffered] = useState(null)
  useEffect(() => {
    if(!couseOffered) {
      get('/ajax/portal/course-offered', {}, res => {
        if(res.id) {
          setCourseOffered(res)
        }
      })
    }
  })

  return (
    couseOffered &&
    <div id="CourseOffered" className="grid-item">
      <h3 className="section header">Course Offered</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: couseOffered && couseOffered.content}} />
    </div>
  )
}

export default CourseOffered