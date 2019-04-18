import React from 'react'
import { TopNav, MainNav, Footer, Sidebar } from '../components'
import MissionVision from '../about/mission-vision';
import History from '../about/history';
import Hymn from '../about/hymn'

const About = () => (
  <div id="About">
    <TopNav />
    <MainNav/>
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
    <Footer/>
  </div>
)

export default About