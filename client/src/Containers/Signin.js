import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import Navbar from "../components/Navbar";
import "./style.css";
const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const loginUser = (e) => {
    e.preventDefault();
    const user = { email, password };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <>
      <div className="row border">
        <div className="col-lg-3 border mt-5  col-sm-12 mx-auto my-auto bg-white">
          <h1 className="mb-3 d-flex  justify-content-center mx-auto">
            Signin
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
            <div className="form-group form-button">
              <input
                className="btnn"
                onClick={loginUser}
                type="submit"
                name="signin"
                id="signin"
                value="Signin"
              />
            </div>
          </form>
          <span className="float-lg-end">
            not signed in?
            <a href="/signup">register</a>
          </span>
        </div>
      </div>
    </>
  );
};
export default Signin;
