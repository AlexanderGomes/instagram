import React, { useState, useEffect } from "react";
import "./FollowerPopUp.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import { FollowingCard, FollowerCard } from "../";

const FollowerPopUp = ({
  closeToggle,
  isFollowingActive,
  isFollowersActive,
  followers,
  following,
  setFlowersActive,
  setFlowingActive,
  username,
}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserByUsername = async () => {
      if (username) {
        const res = await axios.get(`/api/user/username/${username}`);
        setUser(res.data);
      }
    };

    getUserByUsername();
  }, [setUser]);

  // const [isFollowing] = useState(
  //   following.followers.includes(user._id)
  // );

  //to-do// fix bug, being able to set both to false and not having an active one is going to leave an empty space
  const handleFollower = () => {
    setFlowersActive(true);
    setFlowingActive(false);
  };

  const handleFollowing = () => {
    setFlowingActive(true);
    setFlowersActive(false);
  };

  // const [followings] = useState(
  //   following.followers.includes(user._id)
  // );

  return (
    <div className="popUp__main">
      <div className="popUp__color">
        <div className="popUp__top">
          <div className="popUp__icon">
            <AiFillCloseCircle size={20} onClick={() => closeToggle(false)} className='icon__up' />
          </div>
          <div className="popUp__text">
            <p
              className={
                isFollowersActive ? "saved__active" : "saved__noActive"
              }
              onClick={handleFollower}
            >
              Followers
            </p>
            <p
              className={
                isFollowingActive ? "saved__active" : "saved__noActive"
              }
              onClick={handleFollowing}
            >
              Following
            </p>
          </div>
        </div>

        {/* show the followers */}
        <div className="popUp__users">
          {isFollowingActive ? (
            //show followings
            <div className="popUp__following">
              {following.length > 0 ? (
                <>
                  {following.map((users) => {
                    return (
                      <FollowingCard
                        user={user}
                        users={users}
                        key={users._id}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="following__zero"> Not following anybody!</p>
              )}
            </div>
          ) : (
            <div className="popUp__following">
              {followers.length > 0 ? (
                <>
                  {followers?.map((users) => {
                    return (
                      <FollowerCard
                        user={user}
                        users={users}
                        key={users._key}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="following__zero"> No followers!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowerPopUp;
