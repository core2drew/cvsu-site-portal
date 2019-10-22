import React from "react";
import { post } from "Utils";
import Button from "Components/button";
import Modal from "Components/modal";
import Input from "Components/input";
import useForm from "Hooks/useForm";
import signupInitialFields from "./signupInitialFields";
import "./style.scss";

const SignUpModal = ({ isActive, handleClose }) => {
    const handleSignUp = () => {
        post(
            "/ajax/portal/signup",
            {
                studentNo: studentNo.value,
                email: email.value,
                password: password.value
            },
            res => {
                if (res.status > 200) {
                    alert(res.message);
                    return;
                }
                handleClose();
                alert(res.message);
                reset();
            },
            () => alert("Something went wrong")
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

    const [fields, setFieldValue, submitForm, setFieldValues, reset] = useForm(
        signupInitialFields,
        {
            password: validatePassword,
            confirmPassword: validateConfirmPassword
        },
        handleSignUp
    );

    const { studentNo, email, password, confirmPassword } = fields;

    return (
        <Modal
            id="SignUpModal"
            isActive={isActive}
            handleClose={() => {
                handleClose();
                reset();
            }}
        >
            <h3 className="section header">Sign up</h3>
            <div className="fields">
                <Input
                    required
                    name="studentNo"
                    label={"Student Number"}
                    value={studentNo.value}
                    onChange={setFieldValue}
                    error={studentNo.error.status}
                />
                <Input
                    required
                    label={"Email"}
                    name="email"
                    value={email.value}
                    onChange={setFieldValue}
                    error={email.error.status}
                />
                <Input
                    required
                    label={"Password"}
                    name="password"
                    type="password"
                    value={password.value}
                    onChange={setFieldValue}
                    error={password.error.status}
                />
                <Input
                    required
                    label={"Confirm Passowrd"}
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword.value}
                    onChange={setFieldValue}
                    error={confirmPassword.error.status}
                    errorMessage={confirmPassword.error.message}
                />
                <Button text="Sign Up" onClick={submitForm} />
            </div>
        </Modal>
    );
};

export default SignUpModal;
