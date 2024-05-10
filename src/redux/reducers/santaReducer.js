const initialState = {
  data: null,
  loading: false,
  error: null,
};

const santaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_BY_SANTA_ID':
      return {
        ...state,
        loading: false,
        data: action.payload,
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
