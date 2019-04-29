import React from 'react'
import Sidebar from 'Components/sidebar'
import Requirements from 'SiteComponents/requirements';
import MissionVision from 'SiteComponents/mission-vision';
import Hymn from 'SiteComponents/hymn';

const Admission = () => (
  <div id="Admission">
    <div className="container grid">
      <Sidebar 
        id="SideQuickLinks" 
        title="Quick Links"
        links={[
          {
            to: '/',
            slug: 'Admission Requirements'
          },
          {
            to: '/',
            slug: 'Retention Policies'
          },
          {
            to: '/',
            slug: 'Course Offered'
          }
        ]} 
      />
      <Sidebar 
        id="SideAnnouncements" 
        title="Announcements"
        links={[
          {
            to: '/',
            slug: 'Application for Admission Exam for 1st Semester SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Grade 11 Application for SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Grade 7 Application for SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Deadline of Submission of Requirements for Admission Exam'
          }
        ]} 
      />
      <Requirements />
      <MissionVision />
      <Hymn />
    </div>
  </div>
)

export default Admission