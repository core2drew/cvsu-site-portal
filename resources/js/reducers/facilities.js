const initialState = {
    isLoading: true,
    isModalActive: false,
    modalHeaderTitle: "New Facility",
    data: [],
    selectedId: null,
    isConfirmDeleteActive: false,
    sliderImages: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCHING":
        case "SAVING":
        case "UPDATING":
        case "DELETING":
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
                data: action.data,
                isConfirmDeleteActive: false,
                selectedId: null
            };
        case "SUCCESS_UPDATE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                data: action.data
            };
        case "SUCCESS_SAVE":
            return {
                ...state,
                isLoading: false,
                isModalActive: false,
                data: action.data
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
                modalHeaderTitle: "New Facility",
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
                modalHeaderTitle: "Update Facility",
                selectedId: action.id
            };
        case "SHOW_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: true,
                selectedId: action.id
            };
        case "CLOSE_CONFIRM_DELETE":
            return {
                ...state,
                isConfirmDeleteActive: false,
                selectedId: null
            };
        case "ADD_SLIDER_IMAGE":
            return {
                ...state,
                sliderImages: [...state.sliderImages, action.sliderImage]
            };
        default:
            return state;
    }
};

export { initialState };
export default reducer;
