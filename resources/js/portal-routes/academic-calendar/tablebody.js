
import React, { useContext } from 'react'
import moment from 'moment'
import Button from 'Components/button'
import Uuid from 'uuid/v4'
import AcademicCalendarContext from 'Context/academic-calendar'

const TableBody = ({ data }) => {
  const context = useContext(AcademicCalendarContext)
  return (
    data.map(d => {
      let created_at = moment.utc(d.created_at).local().format('MMMM DD, YYYY hh:mm A')
      let updated_at = moment.utc(d.updated_at).local().format('MMMM DD, YYYY hh:mm A')
      return (
        <tr key={Uuid()}>
          <td>{d.activity}</td>
          <td>{created_at}</td>
          <td>{updated_at}</td>
          <td className="actions">
            <Button variant={'update'} text={'Edit'} onClick={() => context.handleEdit(d.id)}/>
            <Button variant={'delete danger'} text={'Delete'} onClick={() => context.handleDelete(d.id)}/>
          </td>
        </tr>
      )
    })
  )
}

export default TableBody