import React from 'react'
import Uuid from 'uuid/v4'
import Table from 'Components/table'
import TableBody from './tablebody'
import './style.scss'

const ReportCards = ({ schoolYears, semesters, grades }) => {
  const tableHeaders = ['Course Code', 'Credit Units', 'Grade', 'Remarks']
  return schoolYears.map(schoolYear => 
    semesters.map(semester =>
      grades[schoolYear][semester] && (
        <div className="report-card" key={Uuid()}>
          <h4 className="header">{semester.toLowerCase() === 'summer' ? semester : `${semester} SEMESTER`}  S.Y. {schoolYear}</h4>
          <Table 
            headers={tableHeaders} 
            hasData={!!schoolYears.length} 
            customTableBody={
              <TableBody 
                schoolYear={schoolYear} 
                semester={semester} 
                grades={grades}
              />
            }
          />
        </div>
      )
    )
  )
}

export default ReportCards