import React from "react";
import Requirements from "SiteComponents/requirements";
import RetentionPolicies from "SiteComponents/retention-policies";
import CourseOffered from "SiteComponents/course-offered";
import SideLinks from "SiteComponents/sidelinks";
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
                <SideLinks />
            </div>
        </div>
    );
};

export default Admission;
