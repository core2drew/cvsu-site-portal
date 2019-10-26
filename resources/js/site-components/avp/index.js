import React from "react";
import "./style.scss";
const AVP = () => {
    return (
        <div id="AVP" className="section">
            <p className="section header">CvSU 2018 - AVP</p>
            <iframe
                width="100%"
                height="250"
                src="videos/AVP2018.mp4"
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default AVP;
