import React, { useState, useEffect, useContext } from 'react'
import Modal from 'Components/modal'
import Button from 'Components/button'
import Input from 'Components/input'
import Context from 'Context/students'

const FormModal = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {state, dispatch, handleAdd, handleUpdate} = useContext(Context)

  useEffect(() => {
    if(state.selectedId) {
      const {first_name, last_name, username} = state.data.filter(d => d.id === state.selectedId)[0]
      setFirstName(first_name)
      setLastName(last_name)
      setUsername(username)
    }
  }, [state.selectedId])
  
  return (
    <Modal 
      isActive={state.isModalActive}
      handleClose={() => dispatch({type: 'CLOSE_MODAL'})}
    >
      <h2 className="section header">{state.modalHeaderTitle}</h2>
      <Input label={'First Name'} onChange={e => setFirstName(e.target.value)} value={firstName} />
      <Input label={'Last Name'} onChange={e => setLastName(e.target.value)} value={lastName} />
      <Input label={'Username'} onChange={e => setUsername(e.target.value)} value={username} />
      <Input label={'Password'} onChange={e => setPassword(e.target.value)} value={password} type={'password'}/>
      {/* {
        state.isUpdateModal ? 
          <Button text="Update" onClick={() => handleUpdate(state.selectedId, first_name, last_name, username)}/> : 
          <Button text="Create" onClick={() => handleAdd(firstName, lastName, username, password)}/>
      } */}
    </Modal>
  )
}

export default FormModal