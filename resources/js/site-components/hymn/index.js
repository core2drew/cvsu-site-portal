import React from "react";
import "./style.scss";

const Hymn = () => (
    <div id="Hymn">
        <h3 className="section header">CvSU Hymn</h3>
        <div id="Lyrics">
            <audio controls>
                <source src="/mp3/CVSU-Hymn.mp3" type="audio/mpeg" />
                Please update your browser to play this audio
            </audio>
            <p>Hail alma mater dear</p>
            <p>
                CvSU all the way through Seat of hope that we dream of Under the
                sky so blue
            </p>
            <p>
                Verdant fields God's gift to you Open our lives a new Oh,our
                hearts, our hands And minds, too In your bossom thrive and grow
            </p>
            <p>
                Seeds of hope are now in bloom Vigilant sons to you have sworn
                To CvSU our faith goes on Cradle of hope and bright vision
            </p>
            <p>
                These sturdy arms that care Are the nations builders Blessed
                with strength and power To our almighty we offer
            </p>
            <p>
                Seeds of hope are now in bloom Vigilant sons to you have sworn
                To CvSU our faith goes on Cradle of hope and bright vision
            </p>
            <p>
                We pray for CvSU God's blessings be with you You're the master,
                we're the builders CvSU leads forever.
            </p>
        </div>
    </div>
);

export default Hymn;
