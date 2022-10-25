import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ReplyForm.css";

const ReplyForm = ({ post, comment }) => {
  const [desc, setDesc] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleReply = async () => {
    const newReply = {
      userId: user._id,
      postId: post._id,
      commentId: comment._id,
      desc,
    };
    try {
      axios.post("/api/reply", newReply);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="form__main">
      <form onSubmit={handleReply}>
        <input
          type="text"
          name="text"
          id="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className='reply__input'
        />
        <button>Post Reply</button>
      </form>
    </div>
  );
};

export default ReplyForm;
