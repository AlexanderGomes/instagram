//docs

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import axios from "axios";
import { format } from "timeago.js";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

//recieving// you keep the name 'comment' but you're receiving the replies, it's all the same
const Reply = ({ comment }) => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  const [like, setLike] = useState(comment.likes.length);
  const [deslike, setDeslike] = useState(comment.deslikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeslike, setIsDeslike] = useState(false);


  const FetchUser = async () => {
    useEffect(() => {
      axios
        .get(`/api/user/` + comment.userId)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, []);
  };
  FetchUser();


  const likeHandler = async () => {
    try {
     await  axios.put("/api/reply/like/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deslikeHandler = async () => {
    try {
      await axios.put("/api/reply/deslike/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setDeslike(isDeslike ? deslike - 1 : deslike + 1);
    setIsDeslike(!isDeslike);
  };

  return (
    <div className="comments__main reply__main">
      <div className="comments__img">
        <img className="img__comments" src={defaultImg} alt="" />
      </div>
      <div className="comments__position">
        <div className="comments__color">
          <div className="comments__info">
            <p className="com__name">{users.name}</p>
            <p className="format">{format(comment.createdAt)}</p>
          </div>

          <p className="comments__desc">{comment.desc} </p>
        </div>
        <div className="comment__likes">
          <AiOutlineLike onClick={likeHandler} />
          <p>{like} Likes</p>
          <AiOutlineDislike onClick={deslikeHandler} />
          <p>{deslike} Dislikes</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
