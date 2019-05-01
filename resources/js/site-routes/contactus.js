import React from 'react'
import Input from 'Components/input'
import Textarea from 'Components/textarea'
import Button from 'Components/button'
import Icon from 'Components/icon'

const ContactUs = () => (
  <div id="ContactUs">
    <div className="container">
      <div id="ContactInfo">
        <h3 className="section header">Contact Us</h3>
        <div className="contact-details">
          <div className="detail">
            <Icon icon={'map-marker'}/>
            Pulo II, Dalahican, Cavite City
          </div>
          <div className="detail">
            <Icon icon={'close-envelope'}/>
            info@cvsu-cc.com
          </div>
          <div className="detail">
            <Icon icon={'phone'}/>
            +63 (46) 481-1990
          </div>
        </div>
        <div className="contact-form">
          <Input label={'Full name'}/>
          <Input label={'Email Address'}/>
          <Textarea label={'Inquiry / Message'}/>
          <Button id="Send" text={'Send'}/>
        </div>
      </div>
    </div>
  </div>
)

export default ContactUs