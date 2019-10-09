import { useState } from "react";

const useForm = (initialValues = {}, validators = {}, submitCallback) => {
    const [value, setValue] = useState(initialValues);

    const setFieldValue = (newValue, name) => {
        setValue({
            ...value,
            [name]: {
                ...value[name],
                value: newValue,
                error: validateField(newValue, name)
            }
        });
    };

    const setFieldValues = newValues => {
        let toSetValues = {};
        for (const i in newValues) {
            if (value.hasOwnProperty(i)) {
                toSetValues = {
                    ...toSetValues,
                    [i]: {
                        ...value[i],
                        value: newValues[i],
                        error: validateField(newValues[i], i)
                    }
                };
            }
        }
        setValue({
            ...value,
            ...toSetValues
        });
    };

    const validateField = (newValue, name) => {
        let error = { status: false, message: "" };
        if (value[name].required) {
            error = newValue
                ? { status: false, message: "" }
                : { status: true, message: "" };
            if (error.status) {
                return error;
            }
        }
        if (value[name].email) {
            error = validateEmail(newValue)
                ? {
                      status: false,
                      message: ""
                  }
                : {
                      status: true,
                      message: "Invalid email format."
                  };
            if (error.status) {
                return error;
            }
        }
        if (validators.hasOwnProperty(name)) {
            return validators[name](newValue, value);
        }
        return error;
    };

    const validateEmail = email => {
        const regex = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
        );
        return regex.test(email);
    };

    const submit = () => {
        let errors = {};
        let isFormValid = true;
        for (const fieldName in value) {
            errors[fieldName] = validateField(
                value[fieldName].value,
                fieldName
            );
        }
        let newValue = value;
        for (const fieldName in errors) {
            if (errors[fieldName].status) {
                isFormValid = false;
            }
            newValue = {
                ...newValue,
                [fieldName]: {
                    ...newValue[fieldName],
                    error: { ...errors[fieldName] }
                }
            };
        }
        if (isFormValid) {
            submitCallback(value);
        } else {
            setValue(newValue);
        }
    };

    const reset = () => {
        let toSetValues = {};
        for (const i in value) {
            toSetValues = {
                ...toSetValues,
                [i]: {
                    ...value[i],
                    value: "",
                    error: { status: false, message: "" }
                }
            };
        }
        setValue({
            ...value,
            ...toSetValues
        });
    };

    return [value, setFieldValue, submit, setFieldValues, reset];
};

export default useForm;
