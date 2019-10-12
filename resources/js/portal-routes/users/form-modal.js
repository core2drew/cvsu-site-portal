import React, { useEffect, useContext } from "react";
import Modal from "Components/modal";
import Button from "Components/button";
import Input from "Components/input";
import Context from "Context/users";
import useForm from "Hooks/useForm";
import userFormInitialFields from "./userFormInitialFields";

const FormModal = () => {
    const { state, dispatch, handleInvite } = useContext(Context);

    // useEffect(() => {
    //     if (state.selectedId) {
    //         const { first_name, last_name, username } = state.data.filter(
    //             d => d.id === state.selectedId
    //         )[0];
    //         setFirstName(first_name);
    //         setLastName(last_name);
    //         setUsername(username);
    //     }
    // }, [state.selectedId]);

    const [fields, setFieldValue, submit, setFieldsValue, reset] = useForm(
        userFormInitialFields,
        {},
        handleInvite
    );

    const { email, firstName, lastName } = fields;

    return (
        <Modal
            isActive={state.isModalActive}
            handleClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
            <h2 className="section header">Invite User</h2>
            <Input
                label={"Email"}
                name="email"
                onChange={setFieldValue}
                value={email.value}
                required
                error={email.error.status}
                errorMessage={email.error.message}
            />
            <Input
                label={"First Name"}
                name="firstName"
                onChange={setFieldValue}
                value={firstName.value}
                required
                error={firstName.error.status}
                errorMessage={firstName.error.message}
            />
            <Input
                label={"Last Name"}
                name="lastName"
                onChange={setFieldValue}
                value={lastName.value}
                required
                error={lastName.error.status}
                errorMessage={lastName.error.message}
            />
            <Button text="Invite" onClick={submit} />
        </Modal>
    );
};

export default FormModal;
