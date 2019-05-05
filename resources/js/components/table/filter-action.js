import React from 'react'
import Dropdown from 'Components/dropdown'
import Input from 'Components/input'

const SearchFilter = () => (
  <div className="search-filter">
    <Dropdown placeHolder={'Search By'} onChange={value => console.log(value)}/>
    <Input variant={'search'}/>
  </div>
)

export default SearchFilter