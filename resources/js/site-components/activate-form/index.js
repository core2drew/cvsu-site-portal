import React from "react";
import useInput from "Hooks/useInput";
import Input from "Components/input";
import Button from "Components/button";
import { post } from "Utils";
import useForm from "Hooks/useForm";
import activateFormInitialFields from "./activateFormInitialFields";
import "./style.scss";

const ActivateForm = ({ studentNo, firstName, lastName, id }) => {
    const url = "/ajax/portal/activate-account";

    const handleSubmit = () => {
        post(
            url,
            {
                id,
                password: password.value
            },
            () => {
                window.location.replace("/auth/login");
            }
        );
    };

    const validatePassword = (value, fields) => {
        if (value.length < 8) {
            return {
                status: true,
                message: ""
            };
        }

        return {
            status: false,
            message: ""
        };
    };

    const validateConfirmPassword = (value, fields) => {
        if (value !== fields.password.value) {
            return {
                status: true,
                message: "Password and confirm password does not match."
            };
        }
        return {
            status: false,
            message: ""
        };
    };

    const [fields, setFieldValue, submit] = useForm(
        activateFormInitialFields,
        {
            password: validatePassword,
            confirmPassword: validateConfirmPassword
        },
        handleSubmit
    );

    const { password, confirmPassword } = fields;

    return (
        <div id="ActivateForm">
            <div className="header">
                <h1 className="title">Activate your account.</h1>
                <p className="message">
                    If you have question please contact the administrator.
                </p>
            </div>
            <div className="form">
                {studentNo && (
                    <div className="student-no">
                        <strong>Student No:</strong> {studentNo}
                    </div>
                )}

                <div className="student-name">
                    <strong>Name:</strong> {firstName} {lastName}
                </div>
                <Input
                    footNote="Minimum 8 characters."
                    required
                    label={"Password"}
                    name="password"
                    type="password"
                    value={password.value}
                    error={password.error.status}
                    onChange={setFieldValue}
                />
                <Input
                    required
                    label={"Confirm Password"}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword.value}
                    error={confirmPassword.error.status}
                    errorMessage={confirmPassword.error.message}
                    onChange={setFieldValue}
                />
                <Button variant="submit" text="Submit" onClick={submit} />
            </div>
        </div>
    );
};

export default ActivateForm;
