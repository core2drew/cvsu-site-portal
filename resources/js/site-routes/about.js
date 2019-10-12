import React from "react";
import History from "SiteComponents/history";
import MissionVision from "SiteComponents/mission-vision";
import Hymn from "SiteComponents/hymn";

const About = () => (
    <div id="About">
        <div className="container grid">
            <History />
            <MissionVision />
            <Hymn />
        </div>
    </div>
);

export default About;
