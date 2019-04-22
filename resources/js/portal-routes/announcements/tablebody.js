
import React from 'react'
import moment, { utc } from 'moment'
import Button from '../../components/button'
import Uuid from 'uuid/v4'

const TableBody = ({ data }) => (
  data.map(d => {
    let created_at = moment.utc(d.created_at).local().format('MMMM DD, YYYY hh:mm A')
    let updated_at = moment.utc(d.updated_at).local().format('MMMM DD, YYYY hh:mm A')
    return (
      <tr key={Uuid()}>
        <td>{d.title}</td>
        <td>{d.slug}</td>
        <td>{d.username}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td className="actions">
          <Button variant={'update'} text={'Edit'}/>
          <Button variant={'delete danger'} text={'Delete'}/>
        </td>
      </tr>
    )
  })
)

export default TableBody