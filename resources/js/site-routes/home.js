import React from 'react'
import Hero from '../components/hero'
import DeanMessage from '../components/dean-message'
import AcademicCalendar from '../components/academic-calendar'
import Announcements from '../components/announcements'

const Home = () => {
  return (
    <div id="Home">
      <Hero />
      <div className="container grid">
        <DeanMessage />
        <AcademicCalendar/>
        <Announcements />
      </div>
    </div>
  )
}

export default Home