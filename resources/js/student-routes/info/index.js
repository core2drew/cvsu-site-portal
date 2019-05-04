import React, { useEffect, useState } from 'react'
import { get } from 'Utils'

const Info = () => {
  const [studentNo, setStudentNo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    get(
      '/ajax/portal/student', 
      {},
      res => {
        setStudentNo(res.studentNo)
        setFirstName(res.firstName)
        setLastName(res.lastName)
      }
    )
  },[])

  return(
    <div id="StudentInfo">
      <h3>{studentNo}</h3>
      <h4>{lastName}, {firstName}</h4>
    </div>
  )
}

export default Info