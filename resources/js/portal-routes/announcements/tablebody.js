
import React, { useContext } from 'react'
import moment from 'moment'
import Button from '../../components/button'
import Uuid from 'uuid/v4'
import AnnouncementsContext from '../../contexts/announcements'

const TableBody = ({ data }) => {
  const announcementsContext = useContext(AnnouncementsContext)
  return (
    data.map(d => {
      let created_at = moment.utc(d.created_at).local().format('MMMM DD, YYYY hh:mm A')
      let updated_at = moment.utc(d.updated_at).local().format('MMMM DD, YYYY hh:mm A')
      return (
        <tr key={Uuid()}>
          <td>{d.title}</td>
          <td>{d.slug}</td>
          <td>{created_at}</td>
          <td>{updated_at}</td>
          <td className="actions">
            <Button variant={'update'} text={'Edit'} onClick={() => announcementsContext.handleEdit(d.id)}/>
            <Button variant={'delete danger'} text={'Delete'} onClick={() => announcementsContext.handleDelete(d.id)}/>
          </td>
        </tr>
      )
    })
  )
}

export default TableBody