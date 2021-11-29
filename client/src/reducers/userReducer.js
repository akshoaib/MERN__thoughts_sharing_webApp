import { userConstant, thoughtConstant } from "../actions/constants";

const initState = {
  name: null,
  detail: null,
  image: null,
  loading: false,
  error: null,
  message: "",
  userThoughts: [],
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case thoughtConstant.GET_USER_THOUGHTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case thoughtConstant.GET_USER_THOUGHTS_SUCCESS:
      state = {
        ...state,
        userThoughts: action.payload.userThoughts,
      };
      break;
    case thoughtConstant.GET_USER_THOUGHTS_FAILED:
      state = {
        ...initState,
      };
      break;
    // default: {
    //   state = { initState };
    // }
  }
  return state;
};
