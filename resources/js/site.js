import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from 'SiteRoutes/home'
import About from 'SiteRoutes/about'
import Facilities from 'SiteRoutes/facilities'
import Admission from 'SiteRoutes/admission'
import TopNav from 'Components/top-nav'
import MainNav from 'Components/main-nav'
import Footer from 'Components/footer'

const App = () => (
    <Router>
      <TopNav />
      <MainNav />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/admission" component={Admission} />
      <Route path="/facilities" component={Facilities} />
      <Footer />
    </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));