import React from "react";
import "./style.scss";
const SideLinks = () => {
    return (
        <div id="SideLinks">
            <div className="links-container">
                <h3 className="title">Quick Links</h3>
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
                        <a href="/admission/course-offered">Course Offered</a>
                    </li>
                </ul>
            </div>
            <div className="links-container">
                <h3 className="title">Downloadable Forms</h3>
                <ul className="links">
                    <li className="item">
                        <a href="/forms/application_form.pdf" target="_blank">
                            Application Form
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideLinks;
