import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './site-routes/home'
import About from './site-routes/about'
import Facilities from './site-routes/facilities'
import { TopNav, MainNav, Footer} from './components'

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