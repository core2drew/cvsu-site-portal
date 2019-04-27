import React from 'react'
import Icon from 'Components/icon'
import classnames from 'classnames'
import './style.scss'

const Modal = props => (
  <div 
    id={props.id} 
    className={
      classnames(`modal ${props.variant}`, {active: props.isActive})
    }>
    <div className="content">
      <Icon variant={'close'} icon={'clear'} onClick={props.handleClose}/>
      {props.children}
    </div>
  </div>
)

Modal.defaultProps = {
  id: '',
  variant: '',
  isActive: false,
  handleClose: () => false
}

export default Modal