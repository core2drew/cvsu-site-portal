import React, { useState } from "react";
import useInput from "Hooks/useInput";
import classnames from "classnames";
import Input from "Components/input";
import Button from "Components/button";
import "./style.scss";

const ActivateForm = () => {
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

    const [errorMessage, setErrorMessage] = useState("");

    const validateForm = () => {
        setErrorMessage("");
        setPasswordError(false);
        setConfirmPasswordError(false);

        // Empty
        if (!password || !confirmPassword) {
            setPasswordError(!password);
            setConfirmPasswordError(!confirmPassword);
            return false;
        }
        // Minlength
        if (password.length < 8) {
            setPasswordError(password.length < 8);
            return false;
        }
        // Not Equal
        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            setErrorMessage("Password and confirm password does not match.");
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
        console.log("Submitted");
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
                    <strong>Student No:</strong> 123456789
                </div>
                <div className="student-name">
                    <strong>Name:</strong> Sandro Calupe
                </div>
                <Input
                    footNote="Minimum 8 characters."
                    required
                    label={"Password"}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    variant={classnames({
                        error: !!passwordError
                    })}
                />
                <Input
                    required
                    label={"Confirm Password"}
                    type="password"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    variant={classnames({
                        error: !!confirmPasswordError
                    })}
                />
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <Button variant="submit" text="Submit" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ActivateForm;
