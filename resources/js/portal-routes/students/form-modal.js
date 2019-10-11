import React, { useEffect, useContext } from "react";
import Modal from "Components/modal";
import Button from "Components/button";
import Input from "Components/input";
import Context from "Context/students";
import useForm from "Hooks/useForm";
import studentFormInitialFields from "./studentFormInitialFields";
const FormModal = () => {
    const { state, dispatch, handleUpdate } = useContext(Context);

    const submitForm = ({ firstName, lastName }) => {
        const id = state.selectedId;
        const firstNameVal = firstName.value;
        const lastNameVal = lastName.value;
        handleUpdate(id, firstNameVal, lastNameVal);
    };

    const [fields, setFieldValue, submit, setFieldValues, reset] = useForm(
        studentFormInitialFields,
        {},
        submitForm
    );

    const { firstName, lastName } = fields;

    useEffect(() => {
        if (state.selectedId) {
            const { first_name, last_name } = state.data.filter(
                d => d.id === state.selectedId
            )[0];
            setFieldValues({
                firstName: first_name,
                lastName: last_name
            });
        }
    }, [state.selectedId]);

    const handleClose = () => {
        reset();
        dispatch({ type: "CLOSE_MODAL" });
    };

    return (
        <Modal isActive={state.isModalActive} handleClose={handleClose}>
            <h2 className="section header">{state.modalHeaderTitle}</h2>
            <Input
                label={"First Name"}
                name="firstName"
                onChange={setFieldValue}
                value={firstName.value}
                required
                error={firstName.error.status}
            />
            <Input
                label={"Last Name"}
                name="lastName"
                onChange={setFieldValue}
                value={lastName.value}
                required
                error={lastName.error.status}
            />

            <Button text="Update" onClick={submit} />
        </Modal>
    );
};

export default FormModal;
