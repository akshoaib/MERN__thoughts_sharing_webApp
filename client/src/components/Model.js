import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, Route, useHistory } from "react-router-dom";
import { getUserThoughts } from "../actions";
const Model = (props) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  let { _id } = useParams();
  const dispatch = useDispatch();
  console.log(_id);
  const [params, setParams] = useState(false);
  // const [likse, setLike] = useState(false);
  const handleClose = () => {
    setParams(true);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const auth = useSelector((state) => state.thought);
  const data = localStorage.getItem("data");
  const parsed = JSON.parse(data);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(getUserThoughts(_id));

    // setLike(false);
  }, [params]);
  useEffect(() => {});
  // const name = props.likedBy.map((h) => {
  //   // return ;
  // });
  // console.log(name);
  return (
    <>
      <a variant="primary" onClick={handleShow}>
        {props.likeCount >= 1 ? `${props.likeCount} likes` : " "}
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Liked By</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.likedBy &&
            props.likedBy.map((val) => {
              return (
                <div>
                  {/* {<Route path={`/getuserbyid/${val._id}`}>{val.name}</Route>} */}
                  {/* {<Link to={`/getuserbyid/${val._id}`}>{val.name}</Link>} */}
                  <NavLink
                    // onClick={() => {
                    // window.location.href = `/getuserbyid/${val._id}`;
                    // }}
                    to={`/getuserbyid/${val._id}`}
                  >
                    {val.name}
                  </NavLink>
                </div>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Model;
