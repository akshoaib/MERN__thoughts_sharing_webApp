import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFollowing,
  addThoughts,
  deleteThought,
  getAllThoughts,
  getFollowing,
  likeThought,
} from "../actions";
import Formthought from "../components/Formthought";
import MYthought from "../components/Mythought";
import Navbar from "../components/Navbar";
const Thoughts = () => {
  const dispatch = useDispatch();
  const thought = useSelector((state) => state.thought);

  console.log(typeof thought.thoughts);
  const follower = useSelector((state) => state.follower);
  // console.log(
  //   "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

  // );
  const [add, setAdd] = useState(false);
  const [like, setLike] = useState(false);
  const [deletet, setDelete] = useState(false);

  const [following, setFollowing] = useState(follower.following);

  // if (follower) {
  //   setFollowing(follower.following);
  // }
  const uploadT = (f) => {
    dispatch(addThoughts(f));
    setAdd(true);
  };
  const likeT = (_id) => {
    // setAdd(true);

    dispatch(likeThought(_id));

    setLike(true);
  };
  const deleteT = (_id) => {
    // console.log("mtidd", _id);
    // setAdd(true);

    dispatch(deleteThought(_id));

    setDelete(true);
    //
    // dispatch(getAllThoughts());
  };

  useEffect(() => {
    dispatch(getAllThoughts());

    setAdd(false);
  }, [add]);
  useEffect(() => {
    dispatch(getAllThoughts());
    setDelete(false);
  }, [deletet]);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(getAllThoughts());
    setLike(false);
  }, [like]);

  // useEffect(() => {
  //   dispatch(getFollowing());
  // }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 mx-auto border">
            {following &&
              following.map((val) => {
                return val.following.map(() => {
                  return <span>{val.following.length} following</span>;
                });
              })}
          </div>
        </div>
        <div class="row ">
          <div className="col-md-4 d-flex justify-content-center  ">
            <Formthought uploadT={uploadT} />
          </div>
          <div className="col-md-8 col-sm-12 ">
            <div className="row  ">
              {/* <div className="col-md-5 border"> */}
              {thought.thoughts &&
                thought.thoughts.map((val) => {
                  return (
                    <div className="col-md-5 col-sm-12  p-5 mt-2 d-flex justify-content-center">
                      <MYthought
                        name={val.name}
                        detail={val.detail}
                        _id={val._id}
                        thoughtImage={val.thoughtImage}
                        likeT={likeT}
                        deleteT={deleteT}
                        likedBy={val.likedBy}
                        likeCount={val.likeCount}
                      />
                    </div>
                  );
                })}
              {/* </div> */}
            </div>
          </div>

          {/* <div className="col-md-4  border">
            <Formthought uploadT={uploadT} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Thoughts;
