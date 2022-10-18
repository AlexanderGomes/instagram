import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./PostForm.css";
import { AiFillCloseCircle } from "react-icons/ai";

const PostForm = ({ setClose }) => {
  const [file, setFile] = useState();
  const [text, setText] = useState('');
  
  const { user } = useSelector((state) => state.auth);


  // inside this function you included two possibilities, posting with img/text of just with text
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
          window.location.reload();
        } catch (err) {}
      } else {
        const newPost = {
          userId: user._id,
          text,
        };
        await axios.post("/api/post", newPost);
        setText("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  
  return (
    <div className="div__position">
      <div className="form__post">
        <form onSubmit={HandlePost} className="post__form">
          <div className="icon__position">
            <AiFillCloseCircle
              className="icon__a"
              size={20}
              onClick={() => setClose(false)}
            />
          </div>
          <label className="file__text">What are you thinking ?</label>
          <input
            type="text"
            name="text"
            id="text"
            onChange={(e) => setText(e.target.value)}
          />
            <input
           className="file"
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg,Screenshot"
          onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn__post" type="submit">
            make a post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
