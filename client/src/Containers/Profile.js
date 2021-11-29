import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getUserThoughts } from "../actions";
import MYthought from "../components/Mythought";
import Navbar from "../components/Navbar";
const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [params, setParams] = useState(false);
  // const myUser = user.userThoughts;
  // console.log(myUser);
  const likedArray = user.userThoughts.map((val) => {
    return val.likedBy.map((fd) => {
      return fd.name;
    });
  });
  // console.log(user.userThoughts);
  // const g = myThoughts.map((val) => {
  //   return val.name;
  // });
  const g = likedArray.map((name) => {
    return;
  });
  console.log(g);
  let { _id } = useParams();
  console.log(_id);

  const gett = () => {
    dispatch(getUserThoughts(_id));
  };
  useEffect(() => {
    // const { _id } = useParams();
    console.log(_id);
    // dispatch(getUserThoughts(_id));
    gett();
  }, []);
  // const firstRender = useRef(true);

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   dispatch(getUserThoughts(_id));

  //   // setLike(false);
  // }, [params]);
  return (
    <>
      <Navbar />
      <div className=" row">
        {user.userThoughts &&
          user.userThoughts.map((val) => {
            return (
              <div className=" border  col-md-4 col-lg-4 d-flex justify-content-center col-sm-12   p-5 mt-2">
                <h5 style={{ margin: "5px" }}>{val.addedBy.name}</h5>
                <MYthought
                  name={val.name}
                  detail={val.detail}
                  _id={val._id}
                  selectedFile={val.selectedFile}
                  thoughtImage={val.thoughtImage}
                  // likeT={likeT}
                  // deleteT={deleteT}
                  likedBy={val.likedBy}
                  likeCount={val.likeCount}
                />
              </div>
            );
          })}
        {/* </div> */}
      </div>
      {/* </div> */}
      <h1>hello</h1>
    </>
  );
};

export default Profile;
