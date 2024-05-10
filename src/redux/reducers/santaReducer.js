const initialState = {
  santaId: null,
  data: null,
  result: [],
  loading: false,
  error: null,
};

const santaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_BY_SANTA_ID':
      return {
        ...state,
        loading: false,
        santaId: action.santaId,
        data: action.payload,
      }
    case 'SET_RESULTS':
      return {
        ...state,
        loading: false,
        result: action.payload,
      }
    case 'RESET_FOUND_RECORDS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default santaReducer;
