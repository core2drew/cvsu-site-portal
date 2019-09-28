import React, { useState } from "react";
import Modal from "Components/modal";
import "./style.scss";

const Facility = props => {
    const [isModalActive, setIsModalActive] = useState(false);

    const handleCloseModal = () => setIsModalActive(false);

    const handleOpenModal = () => setIsModalActive(true);

    return (
        <React.Fragment>
            <Modal isActive={isModalActive} handleClose={handleCloseModal}>
                <div className="details">
                    <div className="facility-slider owl-carousel owl-theme slider">
                        {props.sliderImages.map((imageUrl, index) => (
                            <div
                                className="image"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                                key={index}
                            />
                        ))}
                    </div>
                    {/* <p className="section title">{props.title}</p> */}
                    {/* <p>{props.description}</p> */}
                </div>
            </Modal>
            <div className="facility">
                <div className="hover" onClick={handleOpenModal}>
                    View
                </div>
                <div
                    className="feature-image"
                    style={{ backgroundImage: `url(${props.sliderImages[0]})` }}
                />
                <div className="details">
                    <p className="title">{props.title}</p>
                    <p className="description">{props.description}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Facility;
