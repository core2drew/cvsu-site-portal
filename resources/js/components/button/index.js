import React from 'react'
import Icon from '../icon'
import './style.scss'

const Button = props => (
  props.isVisible &&
  <button 
    id={props.id} 
    className={`cvsu-btn ${props.variant}`}
    onClick={props.onClick}
  >
    {props.text}
    {props.icon && <Icon icon={props.icon}/>}
  </button>
)

Button.defaultProps = {
  id: '',
  variant: '',
  isVisible: true,
  onClick: () => false
}

export default Button