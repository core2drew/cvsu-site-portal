import React from "react";
import Hero from "SiteComponents/hero";
import DeanMessage from "SiteComponents/dean-message";
import AcademicCalendar from "SiteComponents/academic-calendar";
import Announcements from "SiteComponents/announcements";

const Home = () => {
    return (
        <div id="Home">
            <Hero />
            <div className="container grid">
                <DeanMessage />
                <AcademicCalendar />
                <Announcements limit={3} title="Latest Announcements" />
            </div>
        </div>
    );
};

export default Home;
