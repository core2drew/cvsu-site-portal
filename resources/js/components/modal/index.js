import React from 'react'
import './style.scss'

const Modal = props => (
  <div className="modal">
    <div className="content">{props.children}</div>
  </div>
)

export default Modal