import { userConstant, thoughtConstant } from "../actions/constants";

const initState = {
  name: null,
  detail: null,
  image: null,
  loading: false,
  error: null,
  message: "",
  thoughts: [],
  userThoughts: [],
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case userConstant.ADD_THOUGHT_REQUEST:
      state = { ...state, loading: true };
      break;
    case userConstant.ADD_THOUGHT_SUCCESS:
      state = {
        ...state,
        name: action.payload.name,
        detail: action.payload.detail,
        thoughtImage: action.payload.thoughtImage,

        // name: action.payload.name,
      };
      break;
    case thoughtConstant.ADD_THOUGHT_FAILED:
      state = {
        ...state,
        loading: false,
      };
      break;
    case thoughtConstant.GET_ALL_THOUGHTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case thoughtConstant.GET_ALL_THOUGHTS_SUCCESS:
      state = {
        ...state,
        thoughts: action.payload.thoughts,
      };
      break;
    case thoughtConstant.GET_ALL_THOUGHTS_FAILED:
      state = {
        ...initState,
      };
      break;
    case thoughtConstant.LIKE_THOUGHT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case thoughtConstant.DELETE_THOUGHT_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
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
