const inviteStudentInitialFields = {
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
    }
};

export default inviteStudentInitialFields;
