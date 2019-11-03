const initialState = {
    isLoading: true,
    isModalActive: false,
    isUpdateModal: false,
    modalHeaderTitle: "New Activity",
    data: [],
    selectedId: null,
    nextPageUrl: null,
    prevPageUrl: null,
    currentPage: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCHING":
        case "SAVING":
        case "UPDATING":
        case "DELETING":
            return {
                ...state,
                isLoading: true,
                isModalActive: false,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };
        case "SUCCESS_FETCH":
        case "SUCCESS_SAVE":
        case "SUCCESS_UPDATE":
        case "SUCCESS_DELETE":
            return {
                ...state,
                isLoading: false,
                isUpdateModal: false,
                data: action.data,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };
        case "ERROR_SAVE":
        case "ERROR_FETCH":
        case "ERROR_UPDATE":
        case "ERROR_DELETE":
            return {
                ...state,
                isLoading: false,
                isUpdateModal: false,
                nextPageUrl: action.nextPageUrl,
                prevPageUrl: action.prevPageUrl,
                currentPage: action.currentPage
            };

        case "OPEN_MODAL":
            return {
                ...state,
                isModalActive: true,
                isUpdateModal: false,
                modalHeaderTitle: "New Activity",
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
                modalHeaderTitle: "Update Activity",
                selectedId: action.id
            };
        default:
            return state;
    }
};

export { initialState };
export default reducer;
