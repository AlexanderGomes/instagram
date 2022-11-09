import React, { useState, useEffect } from "react";
import noAvatar from "../../assets/noAvatar.png";
import axios from "axios";

const FollowingCard = ({ users, user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const Follow = async () => {
    try {
      await axios.put(`/api/user/${users._id}/follow`, { userId: user._id });
    } catch (error) {
      console.log(error.message);
    }
   setIsFollowing(true ? true : false)
   setIsFollowing(!isFollowing)
  };
  


  useEffect(() => {
    if (user.followings?.includes(users._id)) {
      setIsFollowing(true);
    }
  }, [setIsFollowing, user, users]);


  
  return (
    <div className="popUp__followCard" key={users._id}>
      <div className="popUp__leftInfo">

        <div className="popUp__img">
        <a href={`/profile/${users.username}`}>
        <img
            className="popUp__user__img"
            src={users.profilePicture ? users.profilePicture : noAvatar}
            alt=""
          />
        </a>
        </div>
        <div className="popUp__userInfo">
          <p className="popUp__name">{users.name}</p>
          <p className="popUp__username">{users.username}</p>
        </div>
        <div className="popUp__btn">
          <button className="btn__pop" onClick={Follow}>
            {isFollowing ? <p>Unfollow</p> : <p>Follow</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowingCard;
