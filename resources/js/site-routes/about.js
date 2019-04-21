import React from 'react'
import Sidebar from '../components/sidebar'
import History from '../site-components/history';
import MissionVision from '../site-components/mission-vision';
import Hymn from '../site-components/hymn';

const About = () => (
  <div id="About">
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
      <History />
      <MissionVision />
      <Hymn />
    </div>
  </div>
)

export default About