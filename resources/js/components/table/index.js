import React from 'react'
import Uuid from 'uuid/v4'
import classname from 'classnames'
import './style.scss'

const TableHeader = props => (
  <thead>
    <tr>
      {props.headers.map(header => <th key={Uuid()}>{header}</th>)}
    </tr>
  </thead>
)

const TableData = props => (
  props.items.map(item => (
    <td key={Uuid()}>{item}</td>
  ))
)

const TableBody = props => (
  <tbody>
    {
      props.items.map(item => (
        <tr key={Uuid()}>
          <TableData items={item}/>
        </tr>
      ))
    }
  </tbody>
)

const Table = props => (
  <div id={props.id} className={classname('table-container', props.variant)}>
    <table>
      <TableHeader headers={props.headers}/>
      {props.customTableBody || <TableBody items={props.items} />}
    </table>
    {
      props.hasData || (
        <div className="no-data">
          No data available
        </div>
      )
    }
  </div>
)

Table.defaultProps = {
  headers: [],
  items: [],
  customTableBody: null,
  hasData: false
}

export default Table