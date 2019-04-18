import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './routes/home'
import About from './routes/about'
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
// require('./bootstrap');


const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('App'));