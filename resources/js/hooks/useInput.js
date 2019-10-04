import { useState, useEffect } from "react";

const useInput = ({ initialValue, required, minLength }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);

    const onChange = e => {
        const value = e.target.value;
        setValue(value);
        if (required) {
            setError(!value);
        }
        if (value.length < minLength) {
            setError(true);
        }
    };
    return { value, onChange, error, setError };
};

export default useInput;
