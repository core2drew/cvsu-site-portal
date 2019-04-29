import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from 'Utils'

const Requirements = () => {
  const [requirementsContent, setRequirementsContent] = useState(null)
  useEffect(() => {
    if(!requirementsContent) {
      get('/ajax/portal/requirements', {}, res => {
        if(res.id) {
          setRequirementsContent(res)
        }
      })
    }
  })

  return (
    requirementsContent &&
    <div id="Requirements" className="grid-item">
      <h3 className="section header">Admission Requirements</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: requirementsContent && requirementsContent.content}} />
    </div>
  )
}

export default Requirements