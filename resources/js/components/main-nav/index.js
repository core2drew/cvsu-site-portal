import React from "react";
import Logo from "Components/logo";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";

const MainNav = () => (
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
                <NavLink className="item">
                    Admission
                    <ul className="sub-menu">
                        <NavLink to="/admission/requirements" className="item">
                            Requirements
                        </NavLink>
                        <NavLink
                            to="/admission/retention-policies"
                            className="item"
                        >
                            Retention Policies
                        </NavLink>
                        <NavLink
                            to="/admission/course-offered"
                            className="item"
                        >
                            Course Offered
                        </NavLink>
                    </ul>
                </NavLink>
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

export default MainNav;
