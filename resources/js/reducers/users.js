const initialState = {
  isLoading: false,
  isModalActive: false,
  isUpdateModal: false,
  modalHeaderTitle: 'New User',
  data: [],
  selectedId: null
}

const reducer = (state, action) => {
  switch (action.type) {

    case 'FETCHING':
    case 'SAVING':
    case 'UPDATING':
    case 'DELETING':
      return {
        ...state,
        isLoading: true,
        isModalActive: false
      }
    case 'SUCCESS_FETCH':
    case 'SUCCESS_SAVE':
    case 'SUCCESS_UPDATE':
    case 'SUCCESS_DELETE':
      return {
        ...state,
        isLoading: false,
        isUpdateModal: false,
        data: action.data
      }
    case 'ERROR_SAVE':
    case 'ERROR_FETCH':
    case 'ERROR_UPDATE':
    case 'ERROR_DELETE':
      return {
        ...state,
        isLoading: false,
        isUpdateModal: false
      }

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalActive: true,
        isUpdateModal: false,
        modalHeaderTitle: 'New User',
        selectedId: null
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalActive: false,
        isUpdateModal: false
      }
    case 'OPEN_UPDATE_MODAL':
      return {
        ...state,
        isModalActive: true,
        isUpdateModal: true,
        modalHeaderTitle: 'Update User',
        selectedId: action.id
      }
    default:
      return state;
  }
}

export { initialState }
export default reducer