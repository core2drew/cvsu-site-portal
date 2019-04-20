import React from 'react'
import classnames from 'classnames'
import './style.scss'

const Preloader = props => (
  <div className={
      classnames(
        'preloader', 
        props.variant, 
        {'active': props.isActive}
      )
    }
  >
    <svg className  ="spinner" viewBox="0 0 50 50">
      <circle className ="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  </div>
)

export default Preloader