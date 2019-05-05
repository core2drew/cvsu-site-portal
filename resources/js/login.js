import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { post } from 'Utils'
import Button from 'Components/button'
import Input from 'Components/input'
import Preloader from 'Components/preloader'
import SignUpModal from "LoginComponents/signup-modal"

const App = () => {
  const [isSignUpModalActive, setSignUpModalActive] = useState(false)
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
      alert('Something went wrong. Please try again.')
    }, function() {
      setIsLoading(false)
      alert('Incorrect Username or Password')
    })
  }

  return (
    <React.Fragment>
      <h1 id="Greet">Welcome to CvSU Portal</h1>
      <div id="Login">
        <Preloader isActive={isLoading} variant={'fixed'}/>
        <h3 className="title">Log In</h3>
        <Input value={username} onChange={e => setUsername(e.target.value)} label="Username" />
        <Input value={password} onChange={e => setPassword(e.target.value)} label="Password" type={'password'} />
        
        <Button text={'Log In'} onClick={handleLogin} />
        <div className="footer">
          <Button text={'Sign up'} variant={'-tertiary'} onClick={() => setSignUpModalActive(true)}/> 
          {/* <Button text={'Forget Password'} variant={'tertiary'} />  */}
        </div>
      </div>
      <SignUpModal isActive={isSignUpModalActive} handleClose={() => setSignUpModalActive(false)}/>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));