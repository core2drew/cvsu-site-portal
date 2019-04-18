import React from 'react'
import TopNav from '../components/top-nav'
import MainNav from '../components/main-nav';
import Footer from '../components/footer';
import SideQuickLinks from '../components/side-quicklinks'
import SideAnnouncements from '../components/side-announcements'
import MissionVision from '../about/mission-vision';
import History from '../about/history';
import Hymn from '../about/hymn'

const About = () => (
  <div id="About">
    <TopNav />
    <MainNav/>
      <div className="container grid">
        <SideQuickLinks />
        <SideAnnouncements />
        <History />
        <MissionVision />
        <Hymn />
      </div>
    <Footer/>
  </div>
)

export default About