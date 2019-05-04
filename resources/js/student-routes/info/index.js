import React, { useEffect, useState } from 'react'
import Uuid from 'uuid/v4'
import { get } from 'Utils'

const ReportCards = grade => {

  return (
    <div className="report-card">
      <p>{grade}</p>
    </div>
  )
}

const Info = () => {
  const [studentNo, setStudentNo] = useState('')
  const [name, setName] = useState('')
  const [gradesArr, setGradesArr] = useState([])

  useEffect(() => {
    get(
      '/ajax/portal/student', 
      {},
      res => {
        setStudentNo(res.studentNo)
        setName(`${res.lastName}, ${res.firstName}`)
      }
    )
  },[])

  return(
    <div id="StudentInfo">
      <h3>Student No.: {studentNo}</h3>
      <h3>Name: {name}</h3>
      {
        gradesArr.map(grade => {
          <ReportCard key={Uuid} {...grade}/>
        })
      }
    </div>
  )
}

export default Info