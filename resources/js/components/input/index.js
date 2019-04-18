import React from 'react'
import './style.scss'

const Input = props => (
  <input
    id={props.id}
    className={`cvsu-input ${variant}`} 
    ref={props.ref} 
    type="text" 
    placeholder={props.placeholder}
  />
)

Input.defaultProps = {
  id: '',
  variant: '',
  ref: null,
  placeholder: ''
}

export default Input