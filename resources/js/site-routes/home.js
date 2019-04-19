import React from 'react'
import {
  Hero, 
  DeanMessage, 
  AcademicCalendar, 
  Announcements
} from '../components'

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