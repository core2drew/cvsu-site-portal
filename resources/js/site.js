import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './site-routes/home'
import About from './site-routes/about'
import Facilities from './site-routes/facilities'
import TopNav from './components/top-nav'
import MainNav from './components/main-nav'
import Footer from './components/footer'

const App = () => (
    <Router>
      <TopNav />
      <MainNav />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/facilities" component={Facilities} />
      <Footer />
    </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));