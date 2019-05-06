import React, { useState } from 'react'
import Dropdown from 'Components/dropdown'
import Input from 'Components/input'
import Button from 'Components/button'

const SearchFilter = ({ isVisible, filterSearchBy, handleSearch }) => {
  const [searchBy, setSearchBy] = useState('')
  const [search, setSearch] = useState('')
  return (
    isVisible &&
    <div className="search-filter">
      <Dropdown placeHolder={'Search By'} items={filterSearchBy} variant={'searchby'} onChange={value => setSearchBy(value)}/>
      <Input variant={'search'} placeholder={'Search'} value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Button text={'Search'} onClick={() => searchBy && search && handleSearch(searchBy, search)}/>
    </div>
  )
}

export default SearchFilter