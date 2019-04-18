import React from 'react'
import './style.scss'

const Button = props => (
  <button 
    id={props.id} 
    className={`cvsu-btn ${props.variant}`}
    onClick={props.onClick}
  >
    {props.text}
  </button>
)

Button.defaultProps = {
  id: '',
  variant: '',
  onClick: () => false
}

export default Button