//docs

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./savedPost.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import noAvatar from "../../assets/noAvatar.png";


//done// display the information of the saved posts


//to-do// instead of taking the user to the profile page, try to find a way to display the entire post
//at the same screen

const SavedPost = ({ saved }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const GetUserSaved = async () => {
      const res = await axios.get(`/api/user/${saved.userId}`);
      setUsers(res.data);
    };
    GetUserSaved();
  }, [setUsers]);

  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  return (
    <div className="saved__main">
      {saved.img ? (
        <div>
          <a className="tag" href={"/profile/" + users.username}>
            <div className="post__main__div bottom">
              <div className="post__main">
                <div className="user__information">
                  <div className="img__div">
                    <a className="tag" href={"/profile/" + users.username}>
                      <img
                        className="post__img"
                        src={defaultImg}
                        alt="profileImg"
                      />
                    </a>
                  </div>
                  <div className="text__div">
                    <p>{users.name}</p>
                    <p className="user__time">{format(saved.createdAt)}</p>
                  </div>
                </div>
                <div className="post__information">
                  <p className="post__text">{saved.text}</p>
                  <img className="post__img__div img" src={saved.img} alt="" />
                </div>
              </div>
            </div>
          </a>
        </div>
      ) : (
        <div>
        <div>
      <a className="tag" href={'/profile/' + users.username}>
      <div className="post__main__div">
      <div className="post__main">
        <div className="user__information">
          <div className="img__div">
          <a className="tag" href={'/profile/' + users.username}>
            <img className="post__img" src={defaultImg} alt="profileImg" />
          </a>
          </div>
          <div className="text__div">
            <p>{users.name}</p>
            <p className="user__time">{format(saved.createdAt)}</p>
          </div>
        </div>
        <div className="post__information">
          <p className="post__text">{saved.text}</p>
        </div>
      </div>
    </div>
    </a>
      </div>
        </div>
      )}
    </div>
  );
};

export default SavedPost;
