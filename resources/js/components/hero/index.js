import React from 'react'
import './style.scss'

const Hero = () => (
  <div id="Hero" style={{backgroundImage: "url('images/cvsu_front.png')"}}>
    <div className="container">
      <h2 className="greet">Welcome To <br/> Cavite State University</h2>
      <p className="tagline">A University that helps you to build your future</p>
    </div>
  </div>
)

export default Hero