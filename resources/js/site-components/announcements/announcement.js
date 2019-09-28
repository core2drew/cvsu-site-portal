import React from "react";
import moment from "moment";
import "./announcement.scss";

const Announcement = ({ id, title, slug, content, created_at }) =>
    id && (
        <div className="announcement">
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
            <span class="view-more">View More</span>
        </div>
    );

export default Announcement;
