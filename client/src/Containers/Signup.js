import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import Navbar from "../components/Navbar";
import "./style.css";
const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = useSelector((state) => state.auth);
  const signupUser = async (e) => {
    e.preventDefault();
    const user = { email, password, name };
    const res = await axios.post("http://localhost:5000/signup", user);

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="row border">
        <div className="col-lg-3 border mt-5  col-sm-12 mx-auto my-auto bg-white">
          {/* <div className="myform "> */}
          <h1 className="mb-3 d-flex  justify-content-center mx-auto">
            Signup
          </h1>
          <form method="POST">
            <div className="form-group mb-2">
              <input
                type="email"
                id="email"
                placeholder="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                id="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="name"
                id="name"
                placeholder="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group form-button">
              <input
                className="btnn"
                onClick={signupUser}
                type="submit"
                name="signin"
                id="signup"
                value="Signup"
              />
            </div>
          </form>
          <span className="float-lg-end">
            already have account?
            <a href="/signin">login</a>
          </span>
        </div>
      </div>
    </>
  );
};
export default Signup;
