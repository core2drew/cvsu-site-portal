import React, { useEffect, useContext, useCallback, useState } from "react";
import Modal from "Components/modal";
import Button from "Components/button";
import Input from "Components/input";
import Context from "Context/facilities";
import useForm from "Hooks/useForm";
import facilityFormInitialFields from "./facilityFormInitialFields";

const SliderImages = ({ images }) => {
    const hasImages = images.length;

    if (hasImages) {
        return (
            <div className="facility-images">
                {images.map((file, index) => {
                    const reader = new FileReader();
                    let image;
                    reader.addEventListener("loadend", function(event) {
                        image = event.target.result;
                    });
                    reader.readAsDataURL(file);
                    return (
                        <img
                            className="facility-image"
                            src={image}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
    return <p className="no-image-found">No image found.</p>;
};

const FormModal = () => {
    const { state, dispatch, handleUpdateModal } = useContext(Context);
    const [images, setImages] = useState([]);
    const submitForm = () => {
        const id = state.selectedId;
        handleUpdateModal(id);
    };

    const [fields, setFieldValue, submit, setFieldValues, reset] = useForm(
        facilityFormInitialFields,
        {},
        submitForm
    );

    const initCarousel = useCallback(() => {
        $(document).ready(function() {
            $(".facility-slider.owl-carousel").owlCarousel({
                items: 1
            });
        });
    });

    const initSliderImageInput = useCallback(() => {
        $("#UploadSlider").change(e => {
            const input = e.target;
            if (input.files) {
                setImages([...input.files]);
            }
        });
    });

    const { facilityName } = fields;

    useEffect(() => {
        initCarousel();
        initSliderImageInput();
        if (state.selectedId) {
            const { facility_name } = state.data.filter(
                d => d.id === state.selectedId
            )[0];
            setFieldValues({
                facilityName: facility_name
            });
        }
    }, []);

    const handleClose = () => {
        reset();
        dispatch({ type: "CLOSE_MODAL" });
    };

    return (
        <Modal isActive={state.isModalActive} handleClose={handleClose}>
            <h2 className="section header">{state.modalHeaderTitle}</h2>
            <Input
                label={"Facility Name"}
                name="facilityName"
                onChange={setFieldValue}
                value={facilityName.value}
                required
                error={facilityName.error.status}
            />
            <input id="UploadSlider" type="file" multiple />
            <SliderImages images={images} />
            <div className="action">
                <Button text="Update" onClick={submit} />
            </div>
        </Modal>
    );
};

export default FormModal;
