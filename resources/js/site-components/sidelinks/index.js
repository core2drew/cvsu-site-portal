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
            <div id="Mission">
                <h3 className="title">Mission</h3>
                <p className="content">
                    Cavite State University shall provide excellent, equitable
                    and relevant educational opportunities in the arts, sciences
                    and technology through quality instruction and responsive
                    research and development activities. It shall produce
                    professional, skilled and morally upright individuals for
                    global competitiveness.
                </p>
            </div>
            <div id="Vision">
                <h3 className="title">Vision</h3>
                <p className="content">
                    The premier university in historic Cavite recognized for
                    excellence in the development of globally competitive and
                    morally upright individuals
                </p>
            </div>
        </div>
    );
};

export default SideLinks;
