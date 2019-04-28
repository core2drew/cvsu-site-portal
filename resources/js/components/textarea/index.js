import React from 'react'
import classname from 'classnames'
import './style.scss'

const Textarea = props => (
  <div id={props.id} className={classname("textarea", props.variant)}>
    <label className="label">{props.label}</label>
    <textarea
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
)

Textarea.defaultProps = {
  id: null,
  variant: '',
  placeholder: '',
  value: '',
}

export default Textarea