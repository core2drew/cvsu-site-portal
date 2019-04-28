import React from 'react'
import classname from 'classnames'
import Datpicker from 'react-datepicker'
import './style.scss'

const DatePicker = props => (
  <div id={props.id} className={classname("date-picker", props.variant)}>
    <label className="label">{props.label}</label>
    <Datpicker {...props}/>
  </div>
) 

DatePicker.defaultProps = {
  id: null,
  variant: '',
  label: ''
}

export default DatePicker