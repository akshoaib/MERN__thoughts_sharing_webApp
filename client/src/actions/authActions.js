import { userConstant } from "./constants";
// import axios from "../helpers/axios";
import axios from "axios";
import { Redirect } from "react-router";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.LOGIN_REQUEST,
    });
    const res = await axios.post("http://localhost:5000/signin", user);

    if (res.status === 201) {
      console.log("oooooooooooooooooooooooooooo");
      const { _id, name, token } = res.data;
      const d = { _id, name };
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(d));

      console.log(localStorage.getItem("_id"));
      dispatch({
        type: userConstant.LOGIN_SUCCESS,
        payload: { _id, token },
      });
    } else if (res.status === 400) {
      dispatch({
        type: userConstant.LOGIN_FAILED,
      });
    }
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.SIGNUP_REQUEST,
    });
    const res = await axios.post("http://localhost:5000/signup", user);

    if (res.status === 201) {
      console.log("oooooooooooooooooooooooooooo");
      const { _id, name } = res.data;
      const d = { _id, name };
      window.location.href = "/signin";
      // localStorage.setItem("token", token);
      // localStorage.setItem("data", JSON.stringify(d));

      // console.log(localStorage.getItem("_id"));
      dispatch({
        type: userConstant.SIGNUP_SUCCESS,
        payload: { _id },
      });
    } else if (res.status === 400) {
      dispatch({
        type: userConstant.SIGNUP_FAILED,
      });
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.SIGNOUT_REQUEST,
    });
    localStorage.clear();
    <Redirect to="/signin" />;

    // const res = await axios.post("/signout");

    // if (res.status === 200) {
    //   console.log("lllllllllllllllllllllllll");
    //   localStorage.clear();
    //   <Redirect to="/signin" />;

    //   dispatch({
    //     type: userConstant.SIGNOUT_SUCCESS,
    //   });
    // }
  };
};
