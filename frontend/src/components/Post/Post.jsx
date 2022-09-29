import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { format } from "timeago.js";
import { Comments, CommentsForm } from "../";

const Post = ({ post }) => {
  const [users, setUser] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [like, setLike] = useState(post.likes.length);
  const [deslike, setDeslike] = useState(post.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeslike, setIsDeslike] = useState(false);
  const [comments, setComments] = useState([]);

  const defaultImg = user.profilePicture ? user.profilePicture : noAvatar;

  const FetchUser = async () => {
    useEffect(() => {
      axios
        .get(`/api/user/` + post.userId)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, []);
  };
  FetchUser();

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    setIsLiked(post.dislikes.includes(user._id));
  }, [user._id, post.dislikes]);

  const likeHandler = () => {
    try {
      axios.put("/api/post/like/" + post._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deslikeHandler = () => {
    try {
      axios.put("/api/post/dislike/" + post._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setDeslike(isDeslike ? deslike - 1 : deslike + 1);
    setIsDeslike(!isDeslike);
  };

  const GetPosts = async () => {
    useEffect(() => {
      axios
        .get(`/api/comment/${post._id}`)
        .then((res) => {
          setComments(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, [setComments]);
  };
  GetPosts();



  return (
    <div className="post__main__div">
      <div className="post__main">
        <div className="user__information">
          <div className="img__div">
            <img className="post__img" src={defaultImg} alt="profileImg" />
          </div>
          <div className="text__div">
            <p>{users.name}</p>
            <p className="user__time">{format(post.createdAt)}</p>
          </div>
        </div>
        <div className="post__information">
          <p className="post__text">{post.text}</p>
          <img className="post__img__div" src={post.img} alt="" />
        </div>
        <div className="post__likes">
          <AiFillLike onClick={likeHandler} />
          <p>{like} love</p>
          <AiFillDislike onClick={deslikeHandler} />
          <p>{deslike} hate</p>
        </div>
        <div className="post__bottom">
          <p className="comments" onClick={() => setToggle(true)}>
            See all the {comments.length} comments
          </p>
          <div className="toggle__comments">
            {toggle && <CommentsForm post={post} />}
            {toggle &&
              (comments.length > 0 ? (
                comments.map((comment) => (
                  <div>
                    <Comments
                      className="main"
                      key={comment._id}
                      comment={comment}
                      post={post}
                    />
                  </div>
                ))
              ) : (
                <>
                  <p>No comments</p>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
