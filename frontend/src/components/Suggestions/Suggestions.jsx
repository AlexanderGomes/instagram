import React, { useState, useEffect } from "react";
import "./Suggestions.css";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import axios from "axios";
import {Link} from 'react-router-dom'

const Suggestions = ({ friend }) => {
  const { user } = useSelector((state) => state.auth);
  const defaultImg = friend.profilePicture ? friend.profilePicture : noAvatar;

  const Follow = async () => {
    try {
      await axios.put(`/api/user/${friend._id}/follow`, { userId: user._id });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [following, setFollowing] = useState(
    friend.followers.includes(user._id)
  );

  return (
    <div className="suggestion__main">
      {!following ? (
        <div>
          <div>
          <Link to={'/profile/' + friend.username}>
            <img className="suggestion__img" src={defaultImg} alt="" />
          </Link>
          </div>
          <div className="suggestion__all">
            <div className="suggestion__name">
              <h4>{friend.name}</h4>
            </div>
            <div>
              <button
                className={following ? "follow__btn" : "unfollow__btn"}
                onClick={Follow}
              >
                {following ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="">no suggestions</h1>
      )}
    </div>
  );
};

export default Suggestions;
