import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { post } from './utils'
import Button from './components/button'
import Input from './components/input'
import Preloader from './components/preloader'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleLogin = () => {
    if(!username || !password) {
      alert('Required Username and Password')
      return
    }

    setIsLoading(true)
    post('/ajax/login', {username, password}, function(res){
      if(res.id) {
        window.location.replace("/portal")
        return 
      } 
      setIsLoading(false)
      alert('Incorrect Username or Password')
    })
  }
  
  return (
    <div id="Login">
      <Preloader isActive={isLoading} variant={'fixed'}/>
      <h3 className="title">Log In</h3>
      <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Student ID / Username" />
      <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={'password'} />
      
      <Button text={'Log In'} onClick={handleLogin} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));