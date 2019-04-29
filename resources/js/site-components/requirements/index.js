import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from 'Utils'

const Requirements = () => {
  const [requirements, setRequirements] = useState(null)
  useEffect(() => {
    if(!requirements) {
      get('/ajax/portal/requirements', {}, res => {
        if(res.id) {
          setRequirements(res)
        }
      })
    }
  })

  return (
    requirements &&
    <div id="Requirements" className="grid-item">
      <h3 className="section header">Admission Requirements</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: requirements && requirements.content}} />
    </div>
  )
}

export default Requirements