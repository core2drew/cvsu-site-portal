import React from "react";
import Logo from "Components/logo";
import { Link, NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";

const MainNav = ({ history }) => {
    const isAdmission = location.pathname.includes("admission");
    const isRequirement = location.pathname.includes("requirements");
    const isRetention = location.pathname.includes("retention-policies");
    const isCourse = location.pathname.includes("course-offered");

    const handleAdmission = subpath => {
        history.push(`/admission/${subpath}`);
    };

    return (
        <div id="MainNav">
            <div className="container">
                <Link to="/" className="sitename">
                    <Logo />
                    <span className="schoolname">
                        <p className="name">Cavite State University</p>
                        <p className="branch">Cavite City Campus</p>
                    </span>
                </Link>
                <ul className="menu">
                    <NavLink className="item" to="/about">
                        About
                    </NavLink>
                    <div
                        className={classnames("item", { active: isAdmission })}
                        onClick={() => handleAdmission("requirements")}
                    >
                        Admission
                        <ul className="sub-menu">
                            <div
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAdmission("requirements");
                                }}
                                className={classnames("item", {
                                    active: isRequirement
                                })}
                            >
                                Requirements
                            </div>
                            <div
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAdmission("retention-policies");
                                }}
                                className={classnames("item", {
                                    active: isRetention
                                })}
                            >
                                Retention Policies
                            </div>
                            <div
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAdmission("course-offered");
                                }}
                                className={classnames("item", {
                                    active: isCourse
                                })}
                            >
                                Course Offered
                            </div>
                        </ul>
                    </div>
                    <NavLink className="item" to="/facilities">
                        Facilities
                    </NavLink>
                    <NavLink className="item" to="/contact-us">
                        Contact Us
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default withRouter(MainNav);
