import React from 'react'
import classname from 'classnames'
import './style.scss'

const FileInput = (props) => {
  return (
    <input 
      id={props.id} 
      className={classname("cvsu-file", props.variant)} 
      type="file" 
      accept={props.accept} 
      onChange={e => {
        props.onChange(e)
        e.target.value = ''
      }} 
    />
  )
}
 

FileInput.defaultProps = {
  id: null,
  variants: '',
  accept: null,
  onChange: () => false
}

export default FileInput