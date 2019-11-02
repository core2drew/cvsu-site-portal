import React from "react";
import Input from "Components/input";
import Textarea from "Components/textarea";
import Button from "Components/button";
import Icon from "Components/icon";

const ContactUs = () => (
    <div id="ContactUs">
        <div className="container">
            <div className="mapouter">
                <h1 className="title">We are here.</h1>
                <div className="gmap_canvas">
                    <iframe
                        width="100%"
                        height="500"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=Cvsu%20Cavite%20city&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameBorder="0"
                        scrolling="no"
                    ></iframe>
                </div>
            </div>
            <div id="ContactInfo">
                <h3 className="section header">Contact Us</h3>
                <div className="contact-details">
                    <div className="detail">
                        <Icon icon={"map-marker"} />
                        Pulo II, Dalahican, Cavite City
                    </div>
                    <div className="detail">
                        <Icon icon={"close-envelope"} />
                        cvsuccc@yahoo.com
                    </div>
                    <div className="detail">
                        <Icon icon={"phone"} />
                        +63 431-3570
                    </div>
                </div>
                {/* <div className="contact-form">
                    <Input label={"Full name"} />
                    <Input label={"Email Address"} />
                    <Textarea label={"Inquiry / Message"} onChange={}/>
                    <Button id="Send" text={"Send"} />
                </div> */}
            </div>
        </div>
    </div>
);

export default ContactUs;
