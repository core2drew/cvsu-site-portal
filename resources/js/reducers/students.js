const initialState = {
    isLoading: true,
    isModalActive: false,
    isInviteStudentModalActive: false,
    isUpdateModal: false,
    inviteStudentHeader: "Invite Student",
    modalHeaderTitle: "New User",
    data: [],
    selectedId: null,
    nextPageUrl: null,
    prevPageUrl: null,
    currentPage: null,
    isConfirmDeleteActive: false,
    deleteStudentId: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCHING":
        case "SAVING":
        case "UPDATING":
        case "DELETING":
        case "INVITING":
            return {
                ...state,
                isLoading: true
            };

        case "SUCCESS_FETCH":
            return {
                ...state,
                isLoading: false,
                isUpdateModal: false,
                data: action.data,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };
        case "SUCCESS_DELETE":
            return {
                ...state,
                isLoading: false,
                data: action.data,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage,
                isConfirmDeleteActive: false,
                deleteStudentId: null
            };
        case "SUCCESS_UPDATE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                isUpdateModal: false,
                data: action.data,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };
        case "SUCCESS_SAVE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                isUpdateModal: false,
                data: action.data,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };
        case "SUCCESS_INVITE":
            return {
                ...state,
                isLoading: false,
                isInviteStudentModalActive: false
            };
        case "ERROR_SAVE":
        case "ERROR_FETCH":
        case "ERROR_UPDATE":
        case "ERROR_DELETE":
            return {
                ...state,
                isLoading: false
            };

        case "OPEN_MODAL":
            return {
                ...state,
                isModalActive: true,
                isUpdateModal: false,
                modalHeaderTitle: "New User",
                selectedId: null
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                isModalActive: false,
                isUpdateModal: false,
                isInviteStudentModalActive: false,
                selectedId: null
            };
        case "OPEN_UPDATE_MODAL":
            return {
                ...state,
                isModalActive: true,
                isUpdateModal: true,
                modalHeaderTitle: "Update User",
                selectedId: action.id
            };
        case "OPEN_INVITE_STUDENT_MODAL":
            return {
                ...state,
                isInviteStudentModalActive: true
            };
        case "SHOW_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: true,
                deleteStudentId: action.id
            };
        case "CLOSE_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: false,
                deleteStudentId: null
            };
        default:
            return state;
    }
};

export { initialState };
export default reducer;
