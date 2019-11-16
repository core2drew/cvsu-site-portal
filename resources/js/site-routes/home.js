import React from "react";
import Hero from "SiteComponents/hero";
import DeanMessage from "SiteComponents/dean-message";
import AcademicCalendar from "SiteComponents/academic-calendar";
import Announcements from "SiteComponents/announcements";
import AVP from "SiteComponents/avp";

const Home = () => {
    return (
        <div id="Home">
            <Hero />
            <div className="container grid">
                <div class="main">
                    <DeanMessage />
                    <Announcements limit={3} title="Latest Announcements" />
                </div>
                <div className="sidebar">
                    <AVP />
                    <AcademicCalendar />
                </div>
            </div>
        </div>
    );
};

export default Home;
