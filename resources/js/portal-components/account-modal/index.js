import React, { useState, useContext, useEffect } from "react";
import { post } from "Utils";
import Modal from "Components/modal";
import Input from "Components/input";
import Button from "Components/button";
import CurrentUser from "Context/current-user";
import useForm from "Hooks/useForm";
import accountInitialFields from "./accountInitialFields";
import passwordInitialFields from "./passwordInitialFields";
import "./style.scss";

const AccountModal = ({ isActive, handleClose }) => {
    const context = useContext(CurrentUser);

    useEffect(() => {
        setAccountField(context.email, "email");
    }, [context, isActive]);

    const handleUpdateEmail = () => {
        post(
            "/ajax/portal/user",
            {
                id: context.id,
                email: email.value
            },
            () => window.location.reload(),
            () => alert("Something went wrong."),
            "PATCH"
        );
    };

    const handleUpdatePassword = () => {
        post(
            "/ajax/portal/user/update-password",
            {
                id: context.id,
                currentPassword: currentPassword.value,
                newPassword: newPassword.value
            },
            res => {
                if (res.message) {
                    alert(res.message);
                    return;
                }
                alert("Password changed.");
                handleClose();
                resetPasswordField();
            },
            () => alert("Something went wrong."),
            "PATCH"
        );
    };

    const validateVerifyPassword = (value, fields) => {
        if (
            value !== fields.newPassword.value &&
            fields.newPassword.value !== ""
        ) {
            return {
                status: true,
                message: "New password and verify password does not match."
            };
        }
        return { status: false, message: "" };
    };

    const [accountFields, setAccountField, submitAccountForm] = useForm(
        accountInitialFields,
        {},
        handleUpdateEmail
    );

    const [
        passwordFields,
        setPasswordField,
        submitPasswordField,
        setPasswordFields,
        resetPasswordField
    ] = useForm(
        passwordInitialFields,
        {
            verifyPassword: validateVerifyPassword
        },
        handleUpdatePassword
    );

    const { email } = accountFields;
    const { currentPassword, newPassword, verifyPassword } = passwordFields;

    const handleCloseModal = () => {
        resetPasswordField();
        handleClose();
    };

    return (
        <Modal
            id="AccountModal"
            isActive={isActive}
            handleClose={handleCloseModal}
        >
            <h3 className="section header">Account</h3>
            <div className="fields">
                <Input
                    label={"Email"}
                    name="email"
                    value={email.value}
                    onChange={setAccountField}
                    required
                    error={email.error.status}
                    errorMessage={email.error.message}
                />
                <Button text={"Update Email"} onClick={submitAccountForm} />
            </div>
            <div className="fields change-password">
                <strong>Change Password</strong>
                <Input
                    label={"Current Password"}
                    name="currentPassword"
                    required
                    value={currentPassword.value}
                    onChange={setPasswordField}
                    type={"password"}
                    error={currentPassword.error.status}
                />
                <Input
                    label={"New Password"}
                    name="newPassword"
                    required
                    value={newPassword.value}
                    onChange={setPasswordField}
                    type={"password"}
                    error={newPassword.error.status}
                />
                <Input
                    label={"Verify Password"}
                    name="verifyPassword"
                    required
                    value={verifyPassword.value}
                    onChange={setPasswordField}
                    type={"password"}
                    error={verifyPassword.error.status}
                    errorMessage={verifyPassword.error.message}
                />
                <Button
                    text={"Update Password"}
                    onClick={submitPasswordField}
                />
            </div>
        </Modal>
    );
};

export default AccountModal;
