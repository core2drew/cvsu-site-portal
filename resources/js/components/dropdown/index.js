import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import Uuid from 'uuid/v4'
import Icon from 'Components/icon'
import './style.scss'

const Items = ({ items, handleSelectItem }) => {
  return (
    <div className="items">
      {
        items.map(item =>
          <span 
            key={Uuid()} 
            className="item"
            onClick={
              () => handleSelectItem(item.value, item.label)
            }
          >
            {item.label}
          </span>
        )
      }
    </div>
  )
}

const Dropdown = ({ placeHolder, items, onChange }) => {
  const [isActive, setIsActive] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const handleClose = () => {
    setIsActive(false)
  }

  const handleSelectItem = (value, label) => {
    handleClose()
    setSelectedValue(value)
    setSelectedLabel(label)
    onChange(value)
  }

  useEffect(() => {
    document.addEventListener('click', handleClose)
    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [])

  return (
    <div
      className={
        classname('dropdown', {
        '-active': isActive
        })
      }
    >
      <label 
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation();
          setIsActive(true)
        }}
        className={
          classname(
            "selected",
            {'-placeholder': placeHolder && !selectedLabel}
          )
        }
      >
        {selectedLabel || placeHolder}
        <Icon icon={'caret-down'} />
      </label>
      <Items items={items} handleSelectItem={handleSelectItem} />
    </div>
  )
}

Dropdown.defaultProps = {
  placeHolder: '',
  items: []
}

export default Dropdown