import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './post.css'

import User from '../../assets/user2.png'
import heart from '../../assets/icon/red-heart.png'
import post1 from '../../assets/posts/post1.png'
import icon1 from '../../assets/icon/heart-nofill.png'
import icon2 from '../../assets/icon/send-nofill.png'
import icon3 from '../../assets/icon/comment-nofill.png'
import  Avatar  from '../../assets/noAvatar.png'





const Post = ({post}) => {
    const [users, setUser] = useState([]);

    const { user } = useSelector((state) => state.auth);

    const avatarImage = user.profilePicture ? user.profilePicture : Avatar;

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/api/user/${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);


  return (
    <div className="post-container">

    <div className="post">
    <div className="post-header">
        <img src={avatarImage}className="user-icon" alt=""/>
        <p className="username">{users.name}</p>
    </div>
    <div className="post-feed">
        <div className="post-img-container">
            <img src={post.img} alt=""/>
        </div>
    </div>
    <div className="post-detail">
        <div class="detail-intracables">
            <img src={icon1} className="like-btn" alt=""/>
            <img src={icon2} className="send-btn" alt=""/>
            <img src={icon3} className="comment-btn" alt=""/>
        </div>
        <span className="likes">2.7k likes</span>
        <p className="username">{users.username}</p>
        <p className="post-des">{post.text}</p>

        <div class="comment-box">
            <input type="text" id="comment-input" placeholder="Add a comment"/>
            <button className="add-comment-btn"><img src={icon3} alt=""/></button>
        </div>

        <span className="comment-count">300 comments</span>
    </div>
</div>
</div>
  )
}

export default Post