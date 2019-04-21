import React, { useState, useEffect } from 'react'
import { get, post } from '../utils'
import Uuid from 'uuid/v4'
import Table from '../components/table'
import Button from '../components/button'
import Modal from '../components/modal'
import CKEditor from '../components/ckeditor'
import Input from '../components/input'

const Announcements = () => {
  const url = '/ajax/portal/announcements'
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [isModalActive, setIsModalActive] = useState(false)
  const [data, setData] = useState([])
  const tableHeaders = ['Title', 'Slug', 'Author', 'Created At', 'Updated At', 'Actions']

  const handleOpenModal = () => {
    setIsModalActive(true)
  }

  const handleCloseModal = () => {
    setIsModalActive(false)
  }

  const handleSave = () => {
    post(url, {title, slug}, res => console.log(res))
  }

  useEffect(() => {
    get(url, {}, res => setData(res.data))
  },[])

  const TableBody = () => (
    data.map(d => (
      <tr key={Uuid()}>
        <td>{d.title}</td>
        <td>{d.slug}</td>
        <td>{d.user_id}</td>
        <td>{d.created_at}</td>
        <td>{d.updated_at}</td>
        <td>
          <Button text={'Edit'}/>
          <Button text={'Delete'}/>
        </td>
      </tr>
    ))
  )

  return (
    <div id="Announcements">
      <Button text="Add New" onClick={handleOpenModal}/>
      <Table headers={tableHeaders} customTableBody={<TableBody />}/>
      <Modal isActive={isModalActive} handleClose={handleCloseModal}>
        <h2 className="section header">New Announcement</h2>
        <Input variant="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
        <Input variant="slug" placeholder="Slug" onChange={e => setSlug(e.target.value)}/>
        <CKEditor id="Editor" />
        <Button variant="save" text="Create" onClick={handleSave}/>
      </Modal>
    </div>
  )
}

export default Announcements