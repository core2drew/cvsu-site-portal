import React from 'react'
import './style.scss'

const Input = props => (
  <div className="input">
    <label className="label">{props.label}</label>
    <input
      id={props.id}
      className={`cvsu-input ${props.variant}`} 
      type={props.type} 
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
)

Input.defaultProps = {
  id: null,
  variant: '',
  placeholder: '',
  value: '',
  type: 'text'
}

export default Input