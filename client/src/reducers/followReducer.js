import { followConstant } from "../actions/constants";

const initState = {
  error: null,
  loading: false,
  following: [],
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case followConstant.GET_ALL_FOLLOWING_REQUEST:
      state = { ...state, loading: true };
      break;
    case followConstant.GET_ALL_FOLLOWING_SUCCESS:
      state = {
        ...state,
        loading: false,

        following: action.payload.following,
      };
      break;
    case followConstant.GET_ALL_FOLLOWING_FAILED:
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
