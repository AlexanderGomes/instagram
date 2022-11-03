//docs

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./savedPost.css";
import { format } from "timeago.js";
import noAvatar from "../../assets/noAvatar.png";

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
    <div className="saved__move">
      <div className="saved__main">
        <div className="saved__color">
          <a className="saved__link" href={"/profile/" + users.username}>
            <div className="saved__upInfo">
              <img
                className="saved__user__info"
                src={defaultImg}
                alt="user picture"
              />
              <div className="saved__upText">
                <p className="saved__userName">{users.name}</p>
                <p className="saved__postTime">{format(saved.createdAt)}</p>
                <p className="saved__post">{saved.text}</p>
              </div>
            </div>
            <div className="saved__postInfo">
              {saved.img ? (
                <img className="saved__postImg" src={saved.img} />
              ) : (
                ""
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SavedPost;
