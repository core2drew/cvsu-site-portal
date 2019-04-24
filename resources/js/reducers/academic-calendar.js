const initialState = {
  isLoading: true,
  isModalActive: false,
  isUpdateModal: false,
  data: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS_FETCH':
      return {
        ...state,
        isLoading: false,
        data: [...action.data]
      }

    default:
      state
  }
}

export { initialState }
export default reducer