import React, { useState } from "react";
import classnames from "classnames";
import Input from "Components/input";
import Button from "Components/button";

const ActivateForm = () => {
    const [password, setPassword] = useState({
        value: undefined,
        error: false
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: undefined,
        error: false
    });

    const validateForm = () => {
        setPassword({
            ...password,
            error: !password.value
        });

        setConfirmPassword({
            ...confirmPassword,
            error: !confirmPassword.value
        });

        // if (password.value !== confirmPassword.value) {
        //     alert("Password does not match");
        // }
    };

    const handleSubmit = () => {
        validateForm();
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
                    label={"Password"}
                    type="password"
                    value={password.value}
                    variant={classnames({
                        error: password.error
                    })}
                    name="password"
                    onChange={e =>
                        setPassword({
                            ...password,
                            value: e.target.value,
                            error: !e.target.value
                        })
                    }
                />
                <Input
                    label={"Confirm Password"}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword.value}
                    variant={classnames({
                        error: confirmPassword.error
                    })}
                    onChange={e =>
                        setConfirmPassword({
                            ...confirmPassword,
                            value: e.target.value,
                            error: !e.target.value
                        })
                    }
                />
                <Button variant="submit" text="Submit" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ActivateForm;
