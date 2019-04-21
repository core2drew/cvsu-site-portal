import React from 'react'
import Uuid from 'uuid/v4'
import Table from '../components/table'
import Button from '../components/button'

const Announcements = () => {
  const tableHeaders = ['Title', 'Slug', 'Author', 'Created At', 'Updated At', 'Actions']

  const tableBody = items => (
    items.map((item) => (
      <tr key={Uuid()}>
        
      </tr>
    ))
  )

  return (
    <div id="Announcements">
      <Table headers={tableHeaders} />
    </div>
  )
}

export default Announcements