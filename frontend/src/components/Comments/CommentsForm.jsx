import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./CommentsForm.css";

const CommentsForm = ({ post }) => {
  const [desc, setDesc] = useState(null);
  const { user } = useSelector((state) => state.auth);


  const handleComment = async () => {
    const newComment = {
      userId: user._id,
      postId: post._id,
      desc,
    };
    try {
      axios.post("/api/comment", newComment);
    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <div className="form__main">
      <form onSubmit={handleComment}>
        <input
          type="text"
          name="text"
          id="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className='comment__input'
        />
        <button>Post Comment</button>
      </form>
    </div>
  );
};

export default CommentsForm;
