import React, { useState, useEffect, useContext } from 'react'
import Modal from 'Components/modal'
import Button from 'Components/button'
import Input from 'Components/input'
import Context from 'Context/academic-calendar'

const FormModal = () => {
  const [title, setTitle] = useState('')
  const {state, dispatch} = useContext(Context)
  
  return (
    <Modal 
      isActive={state.isModalActive}
      handleClose={() => dispatch({type: 'CLOSE_MODAL'})}
    >
      <h2 className="section header">New Activity</h2>
      <Input variant="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
      {
        state.isUpdateModal ? <Button text="Update" /> : <Button text="Create" />
      }
    </Modal>
  )
}

export default FormModal