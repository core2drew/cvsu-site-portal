import React from 'react'
import MainNav from '../components/main-nav';
import Footer from '../components/footer';
import SideQuickLinks from '../components/side-quicklinks'
import SideAnnouncements from '../components/side-announcements'
import MissionVision from '../about/mission-vision';
import History from '../about/history';
import Hymn from '../about/hymn'

const About = () => (
  <div id="About">
    <MainNav/>
      <div className="container grid">
        <SideQuickLinks variant={'grid-item'} />
        <SideAnnouncements variant={'grid-item'} />
        <History />
        <MissionVision />
        <Hymn />
      </div>
    <Footer/>
  </div>
)

export default About