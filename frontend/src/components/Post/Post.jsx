//docs
import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { MdSaveAlt } from "react-icons/md";
import { format } from "timeago.js";
import { Comments, CommentsForm } from "../";
import { Link } from "react-router-dom";

//to-do// Implement button color changes when clicked, to increase the user's experience, so they are 100% that the post was liked for example, instead of just increasing the number

//to-do// improve the comment section from just comments and replies to being able to mention anyone and reply to that comment
//explanation// right now you have two schemas, comments and replies, you want to maybe have just one, but to have nested comments which are called replies
//issue with the current method// you can only reply to a comment but never to the reply of that comment, you want to mention and user and be able to notify the user you're replying to

//to-do// make it responsive when possible

const Post = ({ post }) => {
  const [users, setUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [deslike, setDeslike] = useState(post.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeslike, setIsDeslike] = useState(false);
  const [comments, setComments] = useState([]);

  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  // doing // getting user by post.userId
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

  const likeHandler = async () => {
    try {
      await axios.put("/api/post/like/" + post._id, { userId: user._id });
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

  const GetComments = async () => {
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
    }, []);
  };
  GetComments();

  const deletePost = () => {
    try {
      if (
        window.confirm("Are you sure you wish to delete your post?") === true
      ) {
        axios.delete("/api/post/" + post._id);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIcon =
    user._id === post.userId ? <TiDelete size={20} onClick={deletePost} /> : "";

  const savingPost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/saved/${user._id}`, { postId: post._id });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="post__main__div">
      <div className="post__main">
        <div className="top__part">
          <div className="img__div">
            <Link to={"/profile/" + users.username}>
              <img
                className="post__user__img"
                src={defaultImg}
                alt="profileImg"
              />
            </Link>
          </div>
          <div className="text__div">
            <p className="user__name">{users.name}</p>
            <p className="user__time">{format(post.createdAt)}</p>
            <div className="icon">
            {deleteIcon ? <p>{deleteIcon}</p> : ""}
            </div>
          </div>
        </div>
        <div className="post__information">
          <p className="post__text">{post.text} </p>
          <img className="post__img" src={post.img} alt="" />
        </div>
        <div className="post__icons">
          <AiOutlineLike
            size={25}
            onClick={likeHandler}
            className="like__icon"
          />
          <p className="like__num">{like}</p>{" "}
          <p className="like__text">Likes</p>
          <AiOutlineDislike
            className="deslike__icon"
            size={25}
            onClick={deslikeHandler}
          />
          <p className="deslike__num">{deslike}</p>{" "}
          <p className="deslike__text">Dislikes</p>
          <MdSaveAlt className="icon__saved" size={30} onClick={savingPost} />
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
                  <div key={comment._id}>
                    <Comments className="main" comment={comment} post={post} />
                  </div>
                ))
              ) : (
                <>
                  <p className="no__com">No comments</p>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
