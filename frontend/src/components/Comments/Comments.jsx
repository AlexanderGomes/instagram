//docs
import React, { useState, useEffect } from "react";
import "./Comments.css";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import axios from "axios";
import { format } from "timeago.js";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Reply, ReplyForm } from "../";

const Comments = ({ comment, post }) => {
  const [users, setUsers] = useState([]);
  const [reply, setReply] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeslike, setIsDeslike] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(comment.likes.length);
  const [deslike, setDeslike] = useState(comment.deslikes.length);

  const { user } = useSelector((state) => state.auth);
  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  const GetReply = async () => {
    useEffect(() => {
      axios
        .get(`/api/reply/${comment._id}`)
        .then((res) => {
          setReply(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, [setReply]);
  };
  GetReply();

  //doing// getting user by the id of the owner of the comment
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
      await axios.put("/api/comment/like/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };


  const deslikeHandler  = async ()  => {
    try {
      await axios.put("/api/comment/deslike/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setDeslike(isDeslike ? deslike - 1 : deslike + 1);
    setIsDeslike(!isDeslike);
  };

  
  return (
    <div className="comments__main">
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
        <div className="post__bottom">
          <p className="comments__reply" onClick={() => setToggle(true)}>
            See all the {reply.length} replies
          </p>
          <div className="toggle__replies">
            {toggle && <ReplyForm comment={comment} post={post} />}
            {toggle &&
              (reply.length > 0 ? (
                reply.map((comment) => (
                  <div>
                    <Reply
                      className="main"
                      key={comment._id}
                      comment={comment}
                      post={post}
                    />
                  </div>
                ))
              ) : (
                <>
                  <p className="no__reply">No replies</p>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
