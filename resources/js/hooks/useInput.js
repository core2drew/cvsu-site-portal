import { useState, useEffect } from "react";

const useInput = ({ initialValue, required, minLength }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });
    const onChange = e => {
        const value = e.target.value;
        setValue(value);
        setError({
            isError: false
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
    };
    return { value, onChange, error, setError };
};

export default useInput;
