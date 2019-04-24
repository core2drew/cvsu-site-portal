const initialState = {
  isLoading: true,
  isModalActive: false,
  isUpdateModal: false,
  data: []
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
        isModalActive: true
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
        isUpdateModal: true
      }
    default:
      return state;
  }
}

export { initialState }
export default reducer