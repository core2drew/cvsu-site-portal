import React from 'react'
import Requirements from 'SiteComponents/requirements';
import RetentionPolicies from 'SiteComponents/retention-policies';
import CourseOffered from 'SiteComponents/course-offered';

const Admission = () => (
  <div id="Admission">
    <div className="container grid">
      <Requirements />
      <RetentionPolicies />
      <CourseOffered />
    </div>
  </div>
)

export default Admission