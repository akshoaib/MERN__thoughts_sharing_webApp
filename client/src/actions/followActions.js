import axios from "../helpers/axios";
import { followConstant } from "./constants";

export const addFollowing = (_id) => {
  return async (dispatch) => {
    dispatch({
      type: followConstant.ADD_FOLLOW_REQUEST,
    });
    const res = await axios.post(`/followUser/${_id}`);
    if (res.status === 201) {
      const { following } = res.data;
      console.log(following);
    }
  };
};
export const getFollowing = () => {
  console.log("wwwwwwwwwww");
  return async (dispatch) => {
    dispatch({
      type: followConstant.GET_ALL_FOLLOWING_REQUEST,
    });
    const res = await axios.get("/getFollowing");
    console.log("uuuuuuuuuuuuu");
    if (res.status === 200) {
      console.log("yyyyyyyyyyyyyyyyy");
      const { following } = res.data;
      console.log("follwing", following);
      dispatch({
        type: followConstant.GET_ALL_FOLLOWING_SUCCESS,
        payload: { following },
      });
    } else if (res.status === 404) {
      dispatch({
        type: followConstant.GET_ALL_FOLLOWING_FAILED,
      });
    }
  };
};

// export const getFollowers = (_id) => {
//     return async (dispatch) => {
//       dispatch({
//         type: followConstant.GET_ALL_FOLLOWERS_REQUEST,
//       });
//       const res = await axios.post(`/followUser/${_id}`);
//     };
//   };
