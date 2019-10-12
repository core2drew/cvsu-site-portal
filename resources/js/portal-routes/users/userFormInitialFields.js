const userFormInitialFields = {
    email: {
        value: "",
        error: { status: false, message: "" },
        required: true,
        email: true
    },
    firstName: {
        value: "",
        error: { status: false, message: "" },
        required: true
    },
    lastName: {
        value: "",
        error: { status: false, message: "" },
        required: true
    }
};

export default userFormInitialFields;
