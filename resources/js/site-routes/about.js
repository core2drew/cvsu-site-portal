import React from "react";
import History from "SiteComponents/history";
import MissionVision from "SiteComponents/mission-vision";
import Hymn from "SiteComponents/hymn";
import SideLinks from "SiteComponents/sidelinks";
import CoreValues from "SiteComponents/core-values";
const About = () => (
    <div id="About">
        <div className="container grid">
            <div className="grid-item">
                <History />
                <MissionVision />
                <CoreValues />
                <Hymn />
            </div>
            <SideLinks />
        </div>
    </div>
);

export default About;
