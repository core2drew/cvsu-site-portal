const initialState = {
    isLoading: true,
    isModalActive: false,
    isUpdateModal: false,
    modalHeaderTitle: "New User",
    isConfirmDeleteActive: false,
    deleteUserId: null,
    data: [],
    selectedId: null
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
                data: action.data
            };
        case "SUCCESS_DELETE":
            return {
                ...state,
                isLoading: false,
                isConfirmDeleteActive: false,
                deleteUserId: null,
                data: action.data
            };
        case "SUCCESS_UPDATE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                isUpdateModal: false,
                data: action.data
            };
        case "SUCCESS_SAVE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                isUpdateModal: false,
                data: action.data
            };
        case "SUCCESS_INVITE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false
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
                isUpdateModal: false
            };
        case "OPEN_UPDATE_MODAL":
            return {
                ...state,
                isModalActive: true,
                isUpdateModal: true,
                modalHeaderTitle: "Update User",
                selectedId: action.id
            };
        case "SHOW_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: true,
                deleteUserId: action.id
            };
        case "CLOSE_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: false,
                deleteUserId: null
            };
        default:
            return state;
    }
};

export { initialState };
export default reducer;
