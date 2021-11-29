import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../actions";
import store from "../store";
const Navbar = () => {
  // const auth = useSelector((state) => state.auth);
  // const auth = store.getState();
  // console.log(auth.authenticate);
  const token = window.localStorage.getItem("token");
  console.log(token);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  // if (!localStorage.getItem("token")) {
  //   return <Redirect to={`/signin`} />;
  // }

  const loggedin = () => {
    console.log("kkkkkkkkkkkkkkkkkkk");
    // localStorage.clear();
    return (
      <li className="nav-item">
        {/* <span className="nav-link" onClick={logout}>
          Signout
        </span> */}
        <NavLink className="nav-link" to="/signin">
          Signout
        </NavLink>
      </li>
    );
  };

  const loggedout = () => {
    return (
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">
          Signin
        </NavLink>
      </li>
    );
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  ">
        <div className=" navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {token ? loggedin() : loggedout()}
          </ul>
        </div>
      </nav>
      <div
        className="mx-auto"
        style={{
          width: "300px",
          backgroundColor: "white",
          borderRadius: "5px",
          margin: "5px",
          padding: "7px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Memories
      </div>
    </>
  );
};

export default Navbar;
