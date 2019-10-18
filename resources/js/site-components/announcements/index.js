import React, { useEffect, useState } from "react";
import Uuid from "uuid/v4";
import { get } from "Utils";
import Announcement from "./announcement";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Announcements = props => {
    const [announcements, setAnnouncements] = useState([]);
    const [hasViewMore, setHasViewMore] = useState(false);

    useEffect(() => {
        get(
            "/ajax/portal/announcements",
            { limit: props.limit },
            ({ data, next_page_url }) => {
                if (next_page_url) {
                    setHasViewMore(true);
                }
                setAnnouncements(data);
            }
        );
    }, []);

    return (
        <div id="Announcements" className="section">
            {props.title && <p className="section header">{props.title}</p>}
            {announcements.map(announcement => (
                <Announcement {...announcement} key={Uuid()} />
            ))}
            {hasViewMore && (
                <NavLink
                    to="/announcements"
                    id="ViewMoreAnnouncements"
                    className={"button -tertiary"}
                >
                    View More Announcements
                </NavLink>
            )}
        </div>
    );
};

export default Announcements;
