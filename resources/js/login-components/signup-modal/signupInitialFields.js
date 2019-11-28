const signupInitialFields = {
    studentNo: {
        value: "",
        error: { status: false, message: "" },
        required: true
    },
    email: {
        value: "",
        error: { status: false, message: "" },
        required: true,
        email: true
    },
    // password: {
    //     value: "",
    //     error: { status: false, message: "" },
    //     required: true
    // },
    // confirmPassword: {
    //     value: "",
    //     error: { status: false, message: "" },
    //     required: true
    // },
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

export default signupInitialFields;
