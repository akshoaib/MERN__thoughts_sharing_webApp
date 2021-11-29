import { userConstant } from "../actions/constants";

const initState = {
  token: null,
  _id: null,
  authenticate: false,
  authenticating: false,
  error: null,
  message: "",
  loading: false,
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case userConstant.LOGIN_REQUEST:
      state = { ...state, authenticating: true };
      break;
    case userConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        authenticating: false,
        authenticate: true,
        token: action.payload.token,
        _id: action.payload._id,
      };
      break;
    case userConstant.LOGIN_FAILED:
      state = {
        ...state,
        loading: false,
      };
      break;

    case userConstant.SIGNOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.SIGNOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    default: {
      state = { initState };
    }
  }
  return state;
};
