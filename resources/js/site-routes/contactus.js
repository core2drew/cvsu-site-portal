import React from "react";
import Input from "Components/input";
import Textarea from "Components/textarea";
import Button from "Components/button";
import Icon from "Components/icon";

const ContactUs = () => (
    <div id="ContactUs">
        <div className="container">
            <div class="mapouter">
                <h1 class="title">We are here.</h1>
                <div class="gmap_canvas">
                    <iframe
                        width="100%"
                        height="500"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=Cvsu%20Cavite%20city&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
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
                        info@cvsu-cc.com
                    </div>
                    <div className="detail">
                        <Icon icon={"phone"} />
                        +63 (46) 481-1990
                    </div>
                </div>
                <div className="contact-form">
                    <Input label={"Full name"} />
                    <Input label={"Email Address"} />
                    <Textarea label={"Inquiry / Message"} />
                    <Button id="Send" text={"Send"} />
                </div>
            </div>
        </div>
    </div>
);

export default ContactUs;
