const initialState = {
  isLoading: false,
  studentNo: null,
  name: null,
  schoolYears: [],
  semesters: [],
  grades: []
}

const reducer = (state, action) => {
  switch (action.type) {

    case 'FETCHING':
      return {
        ...state,
        isLoading: true,
      }
    case 'SUCCESS_FETCH':
      return {
        ...state,
        isLoading: false,
        studentNo: action.studentNo,
        name: action.name,
        schoolYears: action.schoolYears,
        semesters: action.semesters,
        grades: action.grades
      }

    case 'ERROR_FETCH':
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}

export { initialState }
export default reducer