import React from 'react'
import Uuid from 'uuid/v4'

const TableBody = ({grades, schoolYear, semester}) => {
  return (
    <tbody>
      {
        grades[schoolYear][semester].map(grade => {
          const {CourseCode, CreditUnits, Grade, remarks} = grade
          return (
            <tr key={Uuid()}>
              <td>{CourseCode}</td>
              <td>{CreditUnits}</td>
              <td>{Grade}</td>
              <td>{remarks}</td>
            </tr>
          )
        })
      }
    </tbody>
  )
}

export default TableBody