import React, { useContext, useEffect } from 'react'
import classname from 'classnames'
import Icon from 'Components/icon'
import Context from 'Context/table'

const Pagination = ({ isVisible }) => {
  const context = useContext(Context)
  return isVisible && (
    <div className="pagination">
      <span 
        className={
          classname(
            "page -prev", 
            {'-disabled': !context.state.prevPageUrl }
          )
        } 
        onClick={
          () => !!context.state.prevPageUrl && context.handleChangePage(
              'prev', 
              context.state.searchBy, 
              context.state.search, 
              context.state.currentPage
            )
        }
      >
        <Icon icon={'left-chevron'} />
      </span>
      <span 
        className={
          classname(
            "page -next",
            {'-disabled': !context.state.nextPageUrl }
          )
        } 
        onClick={
          () => !!context.state.nextPageUrl && context.handleChangePage(
              'next', 
              context.state.searchBy, 
              context.state.search, 
              context.state.currentPage
            )
        }
      >
        <Icon icon={'right-chevron'} />
      </span>
    </div>
  )
}

export default Pagination