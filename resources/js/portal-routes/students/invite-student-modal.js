import React, { useState, useEffect, useContext } from "react";
import useInput from "Hooks/useInput";
import Button from "Components/button";
import Input from "Components/input";
import Modal from "Components/modal";
import Context from "Context/students";
import jwt from "jwt-simple";
import classnames from "classnames";

const InviteStudent = () => {
    const {
        value: studentNo,
        onChange: onChangeStudentNo,
        error: studentNoError,
        setError: setStudentNoError
    } = useInput({
        initialValue: "",
        required: true
    });
    const {
        value: email,
        onChange: onChangeEmail,
        error: emailError,
        setError: setEmailError
    } = useInput({
        initialValue: "",
        required: true,
        email: true
    });

    const { state, dispatch, handleAddNewStudent } = useContext(Context);
    return (
        <Modal
            isActive={state.isInviteStudentModalActive}
            handleClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
            <h2 className="section header">{state.inviteStudentHeader}</h2>
            <Input
                required
                label={"Student Number"}
                onChange={onChangeStudentNo}
                value={studentNo}
                variant={classnames({
                    error: studentNoError.isError
                })}
            />
            <Input
                required
                label={"Email"}
                onChange={onChangeEmail}
                value={email}
                variant={classnames({
                    error: emailError.isError
                })}
                errorMessage={emailError.message}
            />
            <Button
                text="Invite"
                onClick={() =>
                    handleAddNewStudent(
                        state.selectedId,
                        first_name,
                        last_name,
                        username
                    )
                }
            />
        </Modal>
    );
};

export default InviteStudent;
