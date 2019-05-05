
import React, { useContext } from 'react'
import moment from 'moment'
import Button from 'Components/button'
import Uuid from 'uuid/v4'
import StudentContext from 'Context/students'

const TableBody = ({ data }) => {
  const {handleDelete, handleOpenModal} = useContext(StudentContext)

  return (
    <tbody>
      {
         data.map(d => {
          let created_at = moment.utc(d.created_at).local().format('MMMM DD, YYYY')
          let updated_at = moment.utc(d.updated_at).local().format('MMMM DD, YYYY')

          return (
            <tr key={Uuid()}>
              <td>{d.student_no}</td>
              <td>{d.first_name}</td>
              <td>{d.last_name}</td>
              <td>{d.username}</td>
              <td>{created_at}</td>
              <td>{updated_at}</td>
              <td className="actions">
                <Button variant={'update'} text={'View Grades'} onClick={() => handleOpenModal(d.id)}/>
                <Button variant={'delete -danger'} text={'Delete'} onClick={() => handleDelete(d.id)}/>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )

}

export default TableBody