import React from "react";
import useInput from "Hooks/useInput";
import classnames from "classnames";
import Input from "Components/input";
import Button from "Components/button";
import { post } from "Utils";
import "./style.scss";

const ActivateForm = ({ StudentNumber, FirstName, LastName }) => {
    const url = "/ajax/portal/activate-account";
    const {
        value: password,
        onChange: onChangePassword,
        error: passwordError,
        setError: setPasswordError
    } = useInput({
        initialValue: "",
        required: true,
        minLength: 8
    });
    const {
        value: confirmPassword,
        onChange: onChangeConfirmPassword,
        error: confirmPasswordError,
        setError: setConfirmPasswordError
    } = useInput({
        initialValue: "",
        required: true
    });

    const validateForm = () => {
        setPasswordError({ isError: false });
        setConfirmPasswordError({ isError: false });

        // Empty
        if (!password || !confirmPassword) {
            setPasswordError({
                isError: true
            });
            setConfirmPasswordError({
                isError: true
            });
            return false;
        }
        // Minlength
        if (password.length < 8) {
            setPasswordError({
                isError: true
            });
            return false;
        }
        // Not Equal
        if (password !== confirmPassword) {
            setConfirmPasswordError({
                isError: true,
                message: "Password and confirm password does not match."
            });
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        const isValid = validateForm();
        if (!isValid) {
            console.log("Invalid Form");
            return;
        }

        post(
            url,
            {
                studentNo: StudentNumber,
                password
            },
            () => {
                window.location.replace("/auth/login");
            }
        );
    };

    return (
        <div id="ActivateForm">
            <div className="header">
                <h1 className="title">Activate your account.</h1>
                <p className="message">
                    If you have question please contact the administrator.
                </p>
            </div>
            <div className="form">
                <div className="student-no">
                    <strong>Student No:</strong> {StudentNumber}
                </div>
                <div className="student-name">
                    <strong>Name:</strong> {LastName}, {FirstName}
                </div>
                <Input
                    footNote="Minimum 8 characters."
                    required
                    label={"Password"}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    variant={classnames({
                        error: !!passwordError.isError
                    })}
                />
                <Input
                    required
                    label={"Confirm Password"}
                    type="password"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    variant={classnames({
                        error: !!confirmPasswordError.isError
                    })}
                    errorMessage={confirmPasswordError.message}
                />
                <Button variant="submit" text="Submit" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ActivateForm;
