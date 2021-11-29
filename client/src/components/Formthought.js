import React, { useState } from "react";

import "./style.css";

const Formthought = (props) => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [thoughtImage, setImage] = useState("");

  const addThought = (e) => {
    e.preventDefault();
    console.log(thoughtImage);
    const form = new FormData();

    form.append("name", name);
    form.append("detail", detail);
    form.append("thoughtImage", thoughtImage);
    props.uploadT(form);
    for (var value of form.values()) {
      console.log(value);
    }

    setName("");
    setDetail("");
    setImage(" ");
  };

  return (
    <>
      <div className="mt-5 w-75 mt-25 ">
        <div className="myform ">
          <h1 className="mb-3 ">
            <i>Share your Thought</i>
          </h1>
          <form method="POST">
            <div className="form-group ">
              <input
                className="border p-2"
                type="name"
                id="name"
                placeholder="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <textarea
                className="border p-2"
                type="story"
                id="story"
                placeholder="thought"
                autoComplete="off"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="file"
                name="thoughtImage"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group form-button">
              <input
                className="btnn border mb-4 btn-primary"
                onClick={addThought}
                type="submit"
                name="signin"
                id="signin"
                value="SUMBIT"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Formthought;
