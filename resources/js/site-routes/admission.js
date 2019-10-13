import React from "react";
import Requirements from "SiteComponents/requirements";
import RetentionPolicies from "SiteComponents/retention-policies";
import CourseOffered from "SiteComponents/course-offered";

const Admission = ({ match }) => {
    const { params } = match;
    return (
        <div id="Admission">
            <div className="container grid">
                <div className="grid-item">
                    {params.subpath === "requirements" && <Requirements />}
                    {params.subpath === "retention-policies" && (
                        <RetentionPolicies />
                    )}
                    {params.subpath === "course-offered" && <CourseOffered />}
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
                            <a href="/admission/course-offered">
                                Course Offered
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admission;
