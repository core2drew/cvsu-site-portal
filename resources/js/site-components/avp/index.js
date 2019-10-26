import React from "react";
import "./style.scss";
const AVP = () => {
    return (
        <div id="AVP" className="section">
            <p className="section header">CvSU 2018 - AVP</p>
            <video
                width="100%"
                height="250"
                controls
                preload="none"
                poster="/images/avp_poster.jpg"
            >
                <source src="videos/AVP2018.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default AVP;
