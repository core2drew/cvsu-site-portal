import React, { useEffect, useState } from "react";
import moment from "moment";
import classnames from "classnames";
import "./announcement.scss";

const Announcement = ({ id, title, slug, content, created_at }) => {
    const [hasViewMore, setHasViewMore] = useState(true);

    const toggleViewMore = () => {
        setHasViewMore(!hasViewMore);
    };

    return (
        <div
            className={classnames("announcement", {
                "view-more": hasViewMore
            })}
        >
            <div className="header">
                <p className="post-date">
                    Posted Date: {moment(created_at).format("MMMM DD, YYYY")}
                </p>
                <p className="title">{title}</p>
            </div>
            <div
                className="message"
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
            <div className="fade"></div>
            <span className="view-more" onClick={toggleViewMore}>
                {hasViewMore ? "View More" : "Hide"}
            </span>
        </div>
    );
};

export default Announcement;
