import React, { useState } from "react";
import useForm from "Hooks/useForm";
import classnames from "classnames";
import Input from "Components/input";
import Button from "Components/button";

const ActivateForm = () => {
    const { fields, handleChange } = useForm({
        password: { value: "" },
        confirmPassword: { value: "" }
    });
    console.log(fields);
    const handleSubmit = () => {};

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
                    required
                    label={"Password"}
                    type="password"
                    value={fields.password.value || ""}
                    variant={classnames({
                        error: !!fields.password.error
                    })}
                    name="password"
                    onChange={handleChange}
                />
                <Input
                    required
                    label={"Confirm Password"}
                    type="password"
                    name="confirmPassword"
                    value={fields.confirmPassword.value || ""}
                    variant={classnames({
                        error: !!fields.confirmPassword.error
                    })}
                    onChange={handleChange}
                />
                <Button variant="submit" text="Submit" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ActivateForm;
