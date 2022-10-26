//docs

import React, { useState} from "react";
import "./Suggestions.css";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noAvatar.png";
import axios from "axios";


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

  const [following] = useState(
    friend.followers.includes(user._id)
  );

  return (
    <div className="suggestion__main">
      {!following ? (
        <div className="move__sug">
          <div>
          <a href={'/profile/' + friend.username}>
            <img className="suggestion__img" src={defaultImg} alt="" />
          </a>
          </div>
          <div className="suggestion__all">
            <div className="suggestion__name">
          <a href={'/profile/' + friend.username} className='a'>
              <h4 className="sug__name">{friend.name}</h4>
          </a>
            </div>
            <div>
              <button
                className={'btn'}
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
