import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import { post } from './utils'
import { Button, Input } from './components'

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
      <Input ref={userNameRef}  placeholder="Student ID / Username" />
      <Input ref={passwordRef}  placeholder="Password" />
      <Button text={'Log In'} onClick={handleLogin} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));