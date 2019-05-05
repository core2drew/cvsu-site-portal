import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import Icon from 'Components/icon'
import './style.scss'

const Dropdown = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleClose = () => {
      setIsActive(false)
    }
    document.addEventListener('click', handleClose)
    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [])

  return (
    <div
      onClick={e => {
        e.nativeEvent.stopImmediatePropagation();
        setIsActive(true)
      }}
      className={
        classname('dropdown', {
        '-active': isActive
        })
      }
    >
      <label className="selected">Dropdown</label>
      <Icon icon={'caret-down'}/>
      <div className="items">
        <span className="item">Item 1</span>
        <span className="item">Item 2</span>
        <span className="item">Item 3</span>
      </div>
    </div>
  )
}

export default Dropdown