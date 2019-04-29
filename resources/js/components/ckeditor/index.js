import React, { useEffect, useRef } from 'react'
import classname from 'classnames'

const CKEditor = props => {
  const editorRef = useRef(null)

  useEffect(() => {
    editorRef.current = window.CKEDITOR.replace(props.id);
    editorRef.current.config.height = props.height;
    editorRef.current.on('change', () => {
      props.onChange(editorRef.current.getData())
    })

  },[])

  useEffect(() => {
    editorRef.current.setData(props.initialValue)
    props.getEditorRef(editorRef.current)
  },[props.initialValue])
  
  return (
    <textarea id={props.id} className={classname('editor', props.variant)}/>
  )
}

CKEditor.defaultProps = {
  onChange: () => false,
  initialValue: '',
  getEditorRef: () => false
}

export default CKEditor