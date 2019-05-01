import React, { useState, useEffect } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import Modal from 'Components/modal'
import './style.scss'

const Facility = props => {
  const [isModalActive, setIsModalActive] = useState(false)

  const handleCloseModal = () => (
    setIsModalActive(false)
  )
  
  const handleOpenModal = () => (
    setIsModalActive(true)
  )

  return (
    <React.Fragment>
      <Modal isActive={isModalActive} handleClose={handleCloseModal}>
        <div className="details">
          <div className="facility-slider owl-carousel owl-theme slider">
            <div className="image" style={{backgroundImage: `url(${props.sliderImages[0]})`}} />
            <div className="image" style={{backgroundImage: `url(${props.sliderImages[0]})`}} />
          </div>
          <p className="section title">{props.title}</p>
          <p>{props.description}</p>
        </div>
      </Modal>
      <div className="facility">
        <div className="hover" onClick={handleOpenModal}>
          View
        </div>
        <div className="feature-image" style={{backgroundImage: `url(${props.sliderImages[0]})`}} />
        <div className="details">
          <p className="title">{props.title}</p>
          <LinesEllipsis 
            className="description"
            text={props.description}
            maxLine='4'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Facility