import React, { useEffect } from 'react'
import classname from 'classnames'

const CKEditor = props => {
  useEffect(() => {
    window.CKEDITOR.replace(props.id)
  },[])
  return (
    <div id={props.id} className={classname('editor', props.variant)}></div>
  )
}

export default CKEditor