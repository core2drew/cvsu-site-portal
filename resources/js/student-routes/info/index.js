import React, { useEffect, useReducer } from 'react'
import Reducer, { initialState } from 'Reducers/student-info'
import Preloader from 'Components/preloader'
import { get } from 'Utils'
import ReportCards from './report-card'

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