import React from "react";
import History from "SiteComponents/history";
import MissionVision from "SiteComponents/mission-vision";
import Hymn from "SiteComponents/hymn";
import AVP from "SiteComponents/avp";
const About = () => (
    <div id="About">
        <div className="container grid">
            <div className="grid-item">
                <History />
                <MissionVision />
                <AVP />
                <Hymn />
            </div>
            <div id="SideQuickLinks">
                <h2 className="title">Quick Links</h2>
                <ul className="links">
                    <li className="item">
                        <a href="/admission/requirements">Requirements</a>
                    </li>
                    <li className="item">
                        <a href="/admission/retention-policies">
                            Retention Policies
                        </a>
                    </li>
                    <li className="item">
                        <a href="/admission/course-offered">Course Offered</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default About;
