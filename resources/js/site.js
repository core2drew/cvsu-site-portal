import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Home from "SiteRoutes/home";
import About from "SiteRoutes/about";
import Facilities from "SiteRoutes/facilities";
import ContactUs from "SiteRoutes/contactus";
import Admission from "SiteRoutes/admission";
import TopNav from "Components/top-nav";
import MainNav from "Components/main-nav";
import Footer from "Components/footer";
import Activate from "SiteRoutes/activate";
import AnnouncementsPage from "SiteRoutes/announcements";

const App = () => (
    <Router>
        <TopNav />
        <MainNav />
        <div className="wrapper">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />

                <Route path="/facilities" component={Facilities} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/activate" component={Activate} />
                <Redirect
                    from="/admission"
                    exact
                    to="/admission/requirements"
                />
                <Route path="/admission/:subpath" component={Admission} />
                <Route path="/announcements" component={AnnouncementsPage} />
            </Switch>
        </div>
        <Footer />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("App"));
