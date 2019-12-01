import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import classname from "classnames";
import { get } from "Utils";
import CurrentUser from "Context/current-user";
import TopNav from "PortalComponents/topnav";
import Sidebar from "PortalComponents/sidebar";
import DeanMessage from "PortalRoutes/dean-message";
import Announcements from "PortalRoutes/announcements";
import AcademicCalendar from "PortalRoutes/academic-calendar";
import Students from "PortalRoutes/students";
import Users from "PortalRoutes/users";
import NoMatch from "PortalRoutes/nomatch";
import Requirements from "PortalRoutes/requirements";
import RetentionPolicies from "PortalRoutes/retention-policies";
import CourseOffered from "PortalRoutes/course-offered";
import StudentInfo from "StudentRoutes/info";
import Facilities from "PortalRoutes/facilities";
const App = () => {
    const [user, setUser] = useState({
        id: null,
        first_name: "",
        last_name: "",
        profile_image: "",
        type: null,
        email: "",
        is_admin: false
    });

    useEffect(() => {
        get("/ajax/portal/user", {}, res => setUser(res));
    }, []);

    const routes = isAdmin => {
        if (isAdmin) {
            return (
                <React.Fragment>
                    <Route path="/portal" exact component={Announcements} />
                    <Route
                        path="/portal/dean-message"
                        exact
                        component={DeanMessage}
                    />
                    <Route
                        path="/portal/academic-calendar"
                        exact
                        component={AcademicCalendar}
                    />
                    <Route
                        path="/portal/requirements"
                        exact
                        component={Requirements}
                    />
                    <Route
                        path="/portal/retention-policies"
                        exact
                        component={RetentionPolicies}
                    />
                    <Route
                        path="/portal/course-offered"
                        exact
                        component={CourseOffered}
                    />
                    <Route
                        path="/portal/facilities"
                        exact
                        component={Facilities}
                    />
                    <Route path="/portal/students" exact component={Students} />
                    <Route path="/portal/users" component={Users} />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <Route path="/portal" exact component={StudentInfo} />
            </React.Fragment>
        );
    };

    return (
        <Router>
            <CurrentUser.Provider value={user}>
                <TopNav />
                {user.id && (
                    <React.Fragment>
                        <Sidebar isVisible={user.is_admin} />
                        <div
                            id="Content"
                            className={classname({
                                "-student": !user.is_admin
                            })}
                        >
                            <Switch>
                                {routes(user.is_admin)}
                                <Route component={NoMatch} />
                            </Switch>
                        </div>
                    </React.Fragment>
                )}
            </CurrentUser.Provider>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("App"));
