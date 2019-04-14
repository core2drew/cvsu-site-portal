import React from 'react'
import TopNav from '../components/top-nav'
import MainNav from '../components/main-nav';
import HeroHeader from '../components/hero';
import DeanMessage from '../components/dean-message';
import Footer from '../components/footer';
import AcademicCalendar from '../components/academic-calendar';
import Announcements from '../components/announcements';

const Home = () => {
  return (
    <div id="Home">
      <TopNav />
      <MainNav />
      <HeroHeader />
      <div className="container grid">
        <DeanMessage />
        <AcademicCalendar/>
        <Announcements />
      </div>
      <Footer />
    </div>
  )
}

export default Home