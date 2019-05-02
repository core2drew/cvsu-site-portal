import React, { useState, useEffect, useContext } from 'react'
import Modal from 'Components/modal'
import Button from 'Components/button'
import Input from 'Components/input'
import Context from 'Context/users'

const FormModal = () => {
  const [activity, setActivity] = useState('')
  const {state, dispatch, handleAdd, handleUpdate} = useContext(Context)

  useEffect(() => {
    if(state.selectedId) {
      const {activity, from, to} = state.data.filter(d => d.id === state.selectedId)[0]
      setActivity(activity)
    }
  }, [state.selectedId])
  
  return (
    <Modal 
      isActive={state.isModalActive}
      handleClose={() => dispatch({type: 'CLOSE_MODAL'})}
    >
      <h2 className="section header">{state.modalHeaderTitle}</h2>
      
      <Input label={'First Name'}/>
      <Input label={'Last Name'}/>
      <Input label={'Username'}/>
      <Input label={'Password'}/>
      {
        state.isUpdateModal ? 
          <Button text="Update" onClick={() => handleUpdate(state.selectedId, activity, startDate, endDate)}/> : 
          <Button text="Create" onClick={() => handleAdd(activity, startDate, endDate)}/>
      }
    </Modal>
  )
}

export default FormModal