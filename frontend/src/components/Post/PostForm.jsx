//docs

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./PostForm.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

const PostForm = ({ setClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);

  // inside this function you included two possibilities, posting with img/text of just with text
  //to-do// include third possibility, post only a picture without text
  const HandlePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/ddphqky8w/image/upload",
          data
        );
        const { url } = uploadRes.data;

        const newPost2 = {
          userId: user._id,
          img: url,
          text,
        };

        try {
          await axios.post("/api/post", newPost2);
          setIsLoading(true);
          setEmpty(false);
          window.location.reload();
        } catch (err) {}
      } else {
        const newPost = {
          userId: user._id,
          text,
        };

        await axios.post("/api/post", newPost);
        setIsLoading(true);
        setEmpty(false);
        setText("");
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      setEmpty(true);
      console.log(err.message);
    }
  };

  return (
    <div
      className="blur__form" /* the background color and positioning goes here */
    >
      <div className="form__post" /* the positioning of the form goes here */>
        <form onSubmit={HandlePost} className="post__form">
          <div className="icon__position">
            <AiFillCloseCircle
              color="red"
              className="icon__a"
              size={20}
              onClick={() => setClose(false)}
            />
          </div>

          <label for="text" className="ipt__text">
            What are you thinking ?
          </label>
          {empty ? <p className="invalid">Empty Values</p> : ""}

          <input
            type="text"
            name="text"
            id="text"
            className="input__text"
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            <label className="label" for="file">
              Choose Picture
            </label>
          </div>
          <div className="check__btn">
            {file ? (
              <div className="picture__form">
                <p>Picture Selected</p>
                <AiFillCheckCircle color="green" size={20} />
              </div>
            ) : (
              <p>No Picture Selected</p>
            )}
          </div>
          <input
            className="file__hidden"
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg,Screenshot"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="sub__btn">
            <button
              type="submit"
              className="btn__form"
              onClick={() => setIsLoading(true)}
            >
              {isLoading ? <div>Loading...</div> : "Make a post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
