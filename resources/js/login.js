import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import { post } from './utils'

const App = () => {
  const userNameRef = useRef()
  const passwordRef = useRef()

  const handleLogin = () => {
    let username = userNameRef.current.value
    let password = passwordRef.current.value
    post('/ajax/login', {username, password}, function(res){
      if(res.id) {
        window.location.replace("/portal")
      }
    })
  }
  
  return (
    <div id="Login">
      <h3 className="title">Log In</h3>
      <input ref={userNameRef} className="cvsu-input" type="text" name="username" placeholder="Student ID / Username"/>
      <input ref={passwordRef} className="cvsu-input" type="password" name="password" placeholder="Password"/>
      <button type="submit" className="cvsu-btn" onClick={handleLogin}>Log In</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));