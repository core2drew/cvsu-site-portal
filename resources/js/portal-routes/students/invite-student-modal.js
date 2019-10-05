import React, { useState, useEffect, useContext } from "react";
import useInput from "Hooks/useInput";
import Button from "Components/button";
import Input from "Components/input";
import Modal from "Components/modal";
import Context from "Context/students";
import classnames from "classnames";
import { post } from "Utils";

const InviteStudent = () => {
    const url = "/ajax/portal/invite/student";
    const { state, dispatch, handleAddNewStudent } = useContext(Context);
    const {
        value: studentNo,
        onChange: onChangeStudentNo,
        error: studentNoError,
        setError: setStudentNoError,
        reset: resetStudentNo
    } = useInput({
        initialValue: "",
        required: true
    });
    const {
        value: email,
        onChange: onChangeEmail,
        error: emailError,
        setError: setEmailError,
        reset: resetEmail
    } = useInput({
        initialValue: "",
        required: true,
        email: true
    });

    const validateForm = () => {
        // Empty
        if (!studentNo || !email) {
            setStudentNoError({
                isError: !studentNo
            });
            setEmailError({
                isError: !email
            });

            return false;
        }
        if (emailError.isError || studentNoError.isError) {
            return false;
        }
        resetForm();
        return true;
    };

    const resetForm = () => {
        resetStudentNo();
        resetEmail();
    };

    const handleValidateInvite = () => {
        const isValid = validateForm();
        if (isValid) {
            // Validate Info
            post(
                url,
                { studentNo, email },
                res => {
                    if (res.status > 200) {
                        dispatch({ type: "ERROR_SAVE" });
                        alert(res.message);
                        return;
                    }
                    // Call invite end point
                },
                () => {
                    dispatch({ type: "ERROR_FETCH" });
                    alert("Something went wrong. Please try again");
                }
            );
            return;
        }
    };

    const handleClose = () => {
        resetForm();
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
            <Button text="Invite" onClick={handleValidateInvite} />
        </Modal>
    );
};

export default InviteStudent;
