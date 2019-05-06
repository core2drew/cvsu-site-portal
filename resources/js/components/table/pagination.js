import React from 'react'
import Icon from 'Components/icon'

const Pagination = () => (
  <div className="pagination">
    <span className="page -prev">
      <Icon icon={'left-chevron'} />
    </span>
    <span className="page -next">
      <Icon icon={'right-chevron'} />
    </span>
  </div>
)

export default Pagination