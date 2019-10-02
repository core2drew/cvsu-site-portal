import { useState, useEffect } from "react";

const useForm = defaultValue => {
    const [fields, setFields] = useState(defaultValue);

    const handleChange = event => {
        setFields(fields => ({
            ...fields,
            [event.target.name]: {
                value: event.target.value
            }
        }));
    };

    return {
        fields,
        handleChange
    };
};

export default useForm;
