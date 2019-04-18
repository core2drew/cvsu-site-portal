import React from 'react'
import {
  TopNav, 
  MainNav, 
  Hero, 
  DeanMessage, 
  Footer, 
  AcademicCalendar, 
  Announcements
} from '../components'

const Home = () => {
  return (
    <div id="Home">
      <TopNav />
      <MainNav />
      <Hero />
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