import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from 'SiteRoutes/home'
import About from 'SiteRoutes/about'
import Facilities from 'SiteRoutes/facilities'
import ContactUs from 'SiteRoutes/contactus'
import Admission from 'SiteRoutes/admission'
import TopNav from 'Components/top-nav'
import MainNav from 'Components/main-nav'
import Footer from 'Components/footer'

const App = () => (
    <Router>
      <TopNav />
      <MainNav />
      <div className="wrapper">
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/admission" component={Admission} />
        <Route path="/facilities" component={Facilities} />
        <Route path="/contact-us" component={ContactUs} />
      </div>
      <Footer />
    </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));