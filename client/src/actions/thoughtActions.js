import axios from "../helpers/axios";
import { thoughtConstant } from "./constants";

export const addThoughts = (thought) => {
  return async (dispatch) => {
    dispatch({
      type: thoughtConstant.ADD_THOUGHT_REQUEST,
    });
    const res = axios.post("/createthought", thought);
  };
};

export const likeThought = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: thoughtConstant.LIKE_THOUGHT_REQUEST,
      });

      const res = await axios.patch(`/likethought`, { _id });

      if (res.status === 201) {
        const { thoughts } = res.data;
        dispatch({
          type: thoughtConstant.GET_ALL_THOUGHTS_SUCCESS,
          payload: { thoughts },
        });
      } else {
        dispatch({
          type: thoughtConstant.GET_ALL_THOUGHTS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllThoughts = () => {
  return async (dispatch) => {
    dispatch({
      type: thoughtConstant.GET_ALL_THOUGHTS_REQUEST,
    });
    // console.log(localStorage.getItem("token"));

    const res = await axios.get("/getallthoughts");
    // console.log(localStorage.getItem("token"));

    if (res.status === 200) {
      const { thoughts } = res.data;
      dispatch({
        type: thoughtConstant.GET_ALL_THOUGHTS_SUCCESS,
        payload: { thoughts },
      });
    } else if (res.status === 400) {
      dispatch({
        type: thoughtConstant.GET_ALL_THOUGHTS_FAILED,
      });
    }
  };
};
export const getUserThoughts = (_id) => {
  console.log(_id);
  return async (dispatch) => {
    dispatch({
      type: thoughtConstant.GET_USER_THOUGHTS_REQUEST,
    });
    // console.log(localStorage.getItem("token"));

    const res = await axios.get(`/getuserbyid/${_id}`);
    // console.log(localStorage.getItem("token"));

    if (res.status === 200) {
      const { userThoughts } = res.data;
      console.log("user", userThoughts);
      dispatch({
        type: thoughtConstant.GET_USER_THOUGHTS_SUCCESS,
        payload: { userThoughts },
      });
    } else if (res.status === 400) {
      dispatch({
        type: thoughtConstant.GET_USER_THOUGHTS_FAILED,
      });
    }
  };
};
export const deleteThought = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: thoughtConstant.DELETE_THOUGHT_REQUEST,
      });

      const res = await axios.delete(`/deletethought/${_id}`);

      if (res.status === 201) {
        dispatch({
          type: thoughtConstant.DELETE_THOUGHT_SUCCESS,
        });
      } else {
        dispatch({
          type: thoughtConstant.DELETE_THOUGHT_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
