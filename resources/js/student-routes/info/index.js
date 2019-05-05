import React, { useEffect, useContext, useReducer } from 'react'
import Reducer, { initialState } from 'Reducers/student-info'
import Preloader from 'Components/preloader'
import CurrentUser from 'Context/current-user'
import Uuid from 'uuid/v4'
import { get } from 'Utils'

const ReportCards = ({ schoolYears, semesters, grades }) => {
  
  return schoolYears.map(sy => 
    semesters.map(sem =>
      grades[sy][sem] && (
        <div className="report-card">
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Credit Units</th>
                <th>Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
            {
              grades[sy][sem].map(grade => {
                const {CourseCode, CreditUnits, Grade, remarks} = grade
                return (
                  <tr>
                    <td>{CourseCode}</td>
                    <td>{CreditUnits}</td>
                    <td>{Grade}</td>
                    <td>{remarks}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      )
    )
  )

  // return schoolYearsKeys.map(sykey => {
  //   let semester = Object.keys(grades[sykey])
  //   return (
  //     <div className="report-card">
  //       <p>{sykey}</p>
  //       {
  //         semester.map(semkey => {
  //           console.log(grades[sykey][semkey])
  //           return (
  //             <React.Fragment>
  //               <p>{semkey}</p>
  //               <div className="grades">
  //                 <table>
  //                   <thead>
  //                     <tr>
  //                       <th>Course Code</th>
  //                       <th>Credit Units</th>
  //                       <th>Grade</th>
  //                       <th>Remarks</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {
  //                       grades[sykey][semkey].map(data => {
  //                         const [CourseCode, CreditsUnits, Grade, remarks] = data
  //                         return(
  //                           <tr>
  //                             <tr>data.CourseCode</tr>
  //                             {/* <tr>CreditsUnits</tr>
  //                             <tr>Grade</tr>
  //                             <tr>remarks</tr> */}
  //                           </tr>
  //                         )
  //                       })
  //                     }
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </React.Fragment>
  //           )
  //         })
  //       }
  //     </div>
  //     )
  // })
}

const Info = () => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  
  useEffect(() => {
      dispatch({type: 'FETCHING'})
      get(
        '/ajax/portal/student', 
        {},
        res => {
          dispatch({
            type: 'SUCCESS_FETCH', 
            studentNo: res.studentNo,
            name: `${res.lastName}, ${res.firstName}`,
            schoolYears: res.schoolYears,
            semesters: res.semesters,
            grades: res.grades
          })
        },
        () => {
          dispatch({type: 'ERROR_FETCH'})
          alert('Something went wrong. Please try again.')
        }
      )
  },[])

  return(
    <div id="StudentInfo">
      <Preloader variant={'fixed'} isActive={state.isLoading}/>
      <h3>Student No.: {state.studentNo}</h3>
      <h3>Name: {state.name}</h3>
      <ReportCards schoolYears={state.schoolYears} semesters={state.semesters} grades={state.grades}/>
    </div>
  )
}

export default Info