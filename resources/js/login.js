import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div id="Login">
    <input type="text" name="username" placeholder="Student ID / Username"/>
    <input type="text" name="password" placeholder="Password"/>
    <button type="submit" className="cvsu-btn">Login</button>
  </div>
)

ReactDOM.render(<App />, document.getElementById('App'));