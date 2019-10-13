import React from "react";
import "./style.scss";
const AVP = () => {
    return (
        <div id="AVP">
            <h3 className="section header">CvSU 2018 - AVP</h3>
            <video controls>
                <source src="/video/AVP2018.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default AVP;
