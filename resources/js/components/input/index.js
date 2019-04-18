import React from 'react'
import './style.scss'

const Input = props => (
  <input
    id={props.id}
    className={`cvsu-input ${props.variant}`} 
    type={props.type} 
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
)

Input.defaultProps = {
  id: '',
  variant: '',
  ref: null,
  placeholder: '',
  type: 'text'
}

export default Input