const passwordInitialFields = {
    currentPassword: {
        value: "",
        error: { status: false, message: "" },
        required: true
    },
    newPassword: {
        value: "",
        error: { status: false, message: "" },
        required: true
    },
    verifyPassword: {
        value: "",
        error: { status: false, message: "" },
        required: true
    }
};

export default passwordInitialFields;
