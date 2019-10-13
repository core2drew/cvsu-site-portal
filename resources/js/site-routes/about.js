import React from "react";
import History from "SiteComponents/history";
import MissionVision from "SiteComponents/mission-vision";
import Hymn from "SiteComponents/hymn";
import AVP from "SiteComponents/avp";
import SideLinks from "SiteComponents/sidelinks";
const About = () => (
    <div id="About">
        <div className="container grid">
            <div className="grid-item">
                <History />
                <MissionVision />
                <AVP />
                <Hymn />
            </div>
            <SideLinks />
        </div>
    </div>
);

export default About;
