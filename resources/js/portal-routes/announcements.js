import React, { useState } from 'react'
import Uuid from 'uuid/v4'
import Table from '../components/table'
import Button from '../components/button'
import Modal from '../components/modal'
import CKEditor from '../components/ckeditor'
import Input from '../components/input'

const Announcements = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const tableHeaders = ['Title', 'Slug', 'Author', 'Created At', 'Updated At', 'Actions']

  const handleOpenModal = () => {
    setIsModalActive(true)
  }

  const handleCloseModal = () => {
    setIsModalActive(false)
  }

  const tableBody = items => (
    items.map((item) => (
      <tr key={Uuid()}>
        
      </tr>
    ))
  )

  return (
    <div id="Announcements">
      <Button text="Add New" onClick={handleOpenModal}/>
      <Table headers={tableHeaders} />

      <Modal isActive={isModalActive} handleClose={handleCloseModal}>
        <h2 className="section header">New Announcement</h2>
        <Input variant="title" placeholder="Title"/>
        <Input variant="slug" placeholder="Slug"/>
        <CKEditor id="Editor" />
        <Button variant="save" text="Create" />
      </Modal>
    </div>
  )
}

export default Announcements