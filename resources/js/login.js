import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import { post } from './utils'
import { Button, Input } from './components'

const App = () => {
  const userNameRef = useRef()
  const passwordRef = useRef()

  const handleLogin = () => {
    let username = userNameRef.current
    let password = passwordRef.current
    post('/ajax/login', {username, password}, function(res){
      if(res.id) {
        window.location.replace("/portal")
      }
    })
  }
  
  return (
    <div id="Login">
      <h3 className="title">Log In</h3>
      <Input onChange={e => userNameRef.current = e.target.value} placeholder="Student ID / Username" />
      <Input onChange={e => passwordRef.current = e.target.value} placeholder="Password" type={'password'} />
      <Button text={'Log In'} onClick={handleLogin} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));