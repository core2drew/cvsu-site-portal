
import React, { useContext } from 'react'
import moment from 'moment'
import Button from 'Components/button'
import Uuid from 'uuid/v4'
import AcademicCalendarContext from 'Context/academic-calendar'

const fromToDate = (from, to) => {
  let fromDate = moment(from)
  let toDate = moment(to)
  let days = toDate.diff(fromDate, 'days')
  
  return days > 1 ? (
    `${fromDate.format('MMMM DD, YYYY')} / ${toDate.format('MMMM DD, YYYY')}`
    ) : (
      fromDate.format('MMMM DD, YYYY')
    )
}

const TableBody = ({ data }) => {
  const context = useContext(AcademicCalendarContext)
  return (
    <tbody>
      {
         data.map(d => {
          let created_at = moment.utc(d.created_at).local().format('MMMM DD, YYYY hh:mm A')
          let updated_at = moment.utc(d.updated_at).local().format('MMMM DD, YYYY hh:mm A')

          return (
            <tr key={Uuid()}>
              <td>{d.activity}</td>
              <td>{fromToDate(d.from, d.to)}</td>
              <td>{created_at}</td>
              <td>{updated_at}</td>
              <td className="actions">
                <Button variant={'update'} text={'Edit'} onClick={() => context.handleEdit(d.id)}/>
                <Button variant={'delete danger'} text={'Delete'} onClick={() => context.handleDelete(d.id)}/>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )

}

export default TableBody