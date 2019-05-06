import React from 'react'
import Uuid from 'uuid/v4'
import classname from 'classnames'
import Dropdown from 'Components/dropdown'
import FilterAction from './filter-action'
import Pagination from './pagination'
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
    <div className="actions">
      {
        props.customFilterAction || 
        <FilterAction 
          isVisible={props.hasFilter} 
          handleSearch={props.handleSearch} 
          filterSearchBy={props.filterSearchBy}
        />
      }
      <Pagination />
    </div>
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
  hasData: false,
  customFilterAction: null,
  hasFilter: false,
  filterSearchBy: [],
  handleSearch: () => false
}

export default Table