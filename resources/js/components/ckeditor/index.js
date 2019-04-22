import React, { useEffect, useState, useRef } from 'react'
import classname from 'classnames'

const CKEditor = props => {
  const editorRef = useRef(null)

  useEffect(() => {
    editorRef.current = window.CKEDITOR.replace(props.id);
    editorRef.current.on('change', () => {
      props.onChange(editorRef.current.getData())
    })

  },[])

  useEffect(() => {
    editorRef.current.setData(props.initialValue)
  },[props.initialValue])
  
  return (
    <textarea id={props.id} className={classname('editor', props.variant)}/>
  )
}

CKEditor.defaultProps = {
  onChange: () => false,
  initialValue: ''
}

export default CKEditor