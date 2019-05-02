import React from 'react'
import FormModal from './form-modal'
import TableBody from './tablebody'

const Users = () => {
  const tableHeaders = ['First Name', 'Last Name', 'Username', 'Created At', 'Updated At', 'Actions']

  const handleOpenModal = id => {
    if(id) {
      dispatch({type: 'OPEN_UPDATE_MODAL', id})
    } else {
      dispatch({type: 'OPEN_MODAL'})
    }
  }
  
  return (
    <div id="Users">
      <Preloader variant={'fixed'} isActive={state.isLoading}/>
      <Button 
        text="Add New"
        onClick={() => handleOpenModal()}
      />
      <Table headers={tableHeaders} hasData={!!state.data.length} customTableBody={<TableBody data={state.data}/>} />
      <FormModal />
    </div>
  )
}

export default Users