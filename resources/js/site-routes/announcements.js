import React from "react";
import SideLinks from "SiteComponents/sidelinks";
import Announcements from "SiteComponents/announcements";
const AnnouncementsPage = () => {
    return (
        <div id="Announcements">
            <div className="container grid">
                <div className="grid-item">
                    <Announcements />
                </div>
                <SideLinks />
            </div>
        </div>
    );
};

export default AnnouncementsPage;
