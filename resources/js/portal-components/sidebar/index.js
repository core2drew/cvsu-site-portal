import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUser from "Context/current-user";
import "./style.scss";

const Sidebar = props => {
    return (
        props.isVisible && (
            <div id="Sidebar" className={props.variant}>
                <React.Fragment>
                    <NavLink exact to="/portal" className="link">
                        Announcements
                    </NavLink>
                    <NavLink
                        exact
                        to="/portal/academic-calendar"
                        className="link"
                    >
                        Academic Calendar
                    </NavLink>
                    <NavLink exact to="/portal/dean-message" className="link">
                        Dean Message
                    </NavLink>
                    <NavLink exact to="/portal/requirements" className="link">
                        Requirements
                    </NavLink>
                    <NavLink
                        exact
                        to="/portal/retention-policies"
                        className="link"
                    >
                        Retention Policies
                    </NavLink>
                    <NavLink exact to="/portal/course-offered" className="link">
                        Course Offered
                    </NavLink>
                    <NavLink to="/portal/students" className="link">
                        Students
                    </NavLink>
                    <NavLink exact to="/portal/users" className="link">
                        Users
                    </NavLink>
                </React.Fragment>
            </div>
        )
    );
};

export default Sidebar;
