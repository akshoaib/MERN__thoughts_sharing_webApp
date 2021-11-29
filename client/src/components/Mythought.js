import React, { useState } from "react";
import "./style.css";
import pic from "../images/ppp.jpg";
import Model from "./Model";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
const MYthought = (props) => {
  const [show, setShow] = useState(false);
  // let { _id } = useParams();

  const data = localStorage.getItem("data");
  const parsed = JSON.parse(data);
  const _id = parsed._id;
  console.log("idddddd", _id);
  const likeThought = (_id) => {
    return props.likeT(_id);
  };
  const deleteThought = (_id) => {
    return props.deleteT(_id);
  };
  console.log(props.likedBy);
  const likeP = (l) => {
    const j = l.find((like, index) => {
      if (like._id === _id) {
        return true;
      }
    });
    // console.log(j);
    if (j) {
      return true;
    }
  };
  return (
    <>
      <div className=" thought">
        <div className="img-div">
          <img src={props.thoughtImage} />
        </div>
        <h5>{props.name}</h5>
        <p
          style={{
            margin: "10px",
          }}
        >
          {props.detail}
        </p>
        <div className="likes">
          <div>
            {/* {console.log(likeP(props.likedBy))} */}
            {likeP(props.likedBy) ? (
              <i
                onClick={() => {
                  likeThought(props._id);
                }}
                className="far fa-heart like iconl"
              />
            ) : (
              <i
                onClick={() => {
                  likeThought(props._id);
                }}
                className="far fa-heart iconl"
              />
            )}

            <span style={{ marginLeft: "2px" }}>
              <Model
                likeCount={props.likeCount}
                _id={props._id}
                likedBy={props.likedBy}
              >
                {props.likeCount >= 1 ? `${props.likeCount} likes` : " "}
              </Model>
            </span>
          </div>

          <i
            onClick={() => {
              deleteThought(props._id);
            }}
            className="far fa-trash-alt dlt"
          />
          {/* <p>
            The <abbr title="World Health Organizatio">WHO</abbr> was founded in
            1948.
          </p> */}
        </div>
      </div>
    </>
  );
};

export default MYthought;
