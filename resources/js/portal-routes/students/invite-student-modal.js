import React, { useContext } from "react";
import useForm from "Hooks/useForm";
import Button from "Components/button";
import Input from "Components/input";
import Modal from "Components/modal";
import Context from "Context/students";
import inviteStudentInitialFields from "./inviteStudentInitialFields";
const InviteStudent = () => {
    const { state, dispatch, handleInvitation } = useContext(Context);

    const handleValidateInvite = value => {
        const { studentNo, email } = value;
        handleInvitation({ studentNo: studentNo.value, email: email.value });
    };

    const [fields, setFieldValue, submitForm, setFieldValues, reset] = useForm(
        inviteStudentInitialFields,
        {},
        handleValidateInvite
    );
    const { studentNo, email } = fields;

    const handleClose = () => {
        reset();
        dispatch({ type: "CLOSE_MODAL" });
    };

    return (
        <Modal
            isActive={state.isInviteStudentModalActive}
            handleClose={handleClose}
        >
            <h2 className="section header">{state.inviteStudentHeader}</h2>
            <Input
                required
                label={"Student Number"}
                onChange={setFieldValue}
                value={studentNo.value}
                name="studentNo"
                error={studentNo.error.status}
            />
            <Input
                required
                label={"Email"}
                onChange={setFieldValue}
                value={email.value}
                name="email"
                error={email.error.status}
                errorMessage={email.error.message}
            />
            <Button text="Invite" onClick={submitForm} />
        </Modal>
    );
};

export default InviteStudent;
