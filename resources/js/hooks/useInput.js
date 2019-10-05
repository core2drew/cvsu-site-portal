import { useState, useEffect } from "react";

const useInput = ({ initialValue, required, minLength, email }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });

    const validateEmail = email => {
        const regex = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
        );
        return !regex.test(email);
    };

    const onChange = e => {
        const value = e.target.value;
        setValue(value);
        setError({
            isError: false,
            message: ""
        });
        if (required && !value) {
            setError({
                isError: true
            });
        }
        if (value.length < minLength) {
            setError({
                isError: true
            });
        }
        if (email) {
            const isError = validateEmail(value);
            const message = isError ? "Invalid email format." : "";
            setError({
                isError,
                message
            });
        }
    };
    return { value, onChange, error, setError };
};

export default useInput;
