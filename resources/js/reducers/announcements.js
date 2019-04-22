const initialState = {
  isLoading: true,
  isModalActive: false,
  data: []
}

const reducer = (state, action) => {
  switch (action.type) {

    case 'FETCHING':
    case 'SAVING':
    case 'DELETING':
      return {
        ...state,
        isLoading: true,
        isModalActive: false
      }
    case 'SUCCESS_FETCH':
    case 'SUCCESS_SAVE':
    case 'SUCCESS_DELETE':
      return {
        ...state,
        isLoading: false,
        data: action.data
      }
    case 'ERROR_SAVE':
    case 'ERROR_FETCH':
    case 'ERROR_DELETE':
      return {
        ...state,
        isLoading: false
      }

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalActive: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalActive: false
      }
    default:
      return state;
  }
}

export { initialState }
export default reducer