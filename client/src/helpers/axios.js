import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import store from "../store";
// const token = window.localStorage.getItem("token");
console.log(localStorage.getItem("token"));
const token = localStorage.getItem("token");
console.log(token);
const api = axios.create({
  baseURL: "http://localhost:5000",
  Authorization: token ? `Bearer ${token}` : "",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("vvvvvvvvvvvv", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log("hhhhhhhhhhhhh");

    const status = error.response && error.response.status;
    if (status && status === 500) {
      console.log("hhhhhhhhhhhhh");
      // localStorage.clear();
      // <Redirect to="/signin" />;
      // window.location.reload(false);
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
