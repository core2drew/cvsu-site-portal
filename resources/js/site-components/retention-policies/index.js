import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { get } from 'Utils'

const RetentionPolicies = () => {
  const [retentionPolicy, setRetentionPolicy] = useState(null)
  useEffect(() => {
    if(!retentionPolicy) {
      get('/ajax/portal/retention-policies', {}, res => {
        if(res.id) {
          setRetentionPolicy(res)
        }
      })
    }
  })

  return (
    retentionPolicy &&
    <div id="RetentionPolicies" className="grid-item">
      <h3 className="section header">Retention Policies</h3>
      <div className="content" dangerouslySetInnerHTML={{ __html: retentionPolicy && retentionPolicy.content}} />
    </div>
  )
}

export default RetentionPolicies