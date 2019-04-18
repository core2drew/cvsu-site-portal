import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

const Facility = props => (
  <div className="facility">
    <div className="hover">
      View
    </div>
    <div className="feature-image" style={{backgroundImage: `url(${props.backgroundImage})`}} />
    <div className="details">
      <p className="title">{props.title}</p>
      <p className="description">
        <LinesEllipsis 
          text={props.description}
          maxLine='4'
          ellipsis='...'
          trimRight
          basedOn='letters'
        />
      </p>
    </div>
  </div>
)

export default Facility