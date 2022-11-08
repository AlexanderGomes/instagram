import React from "react";
import "./FollowerPopUp.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

const FollowerPopUp = ({
  changeFollowingState,
  changeFollowerState,
  closeToggle,
  isFollowingActive,
  followers,
  following,
}) => {
  console.log(following.length);

  return (
    <div className="popUp__main">
      <div className="popUp__color">
        <div className="popUp__info">
          <div className="popUp__top">
            <div className="popUp__icon">
              <AiFillCloseCircle size={20} onClick={() => closeToggle(false)} />
            </div>
            <div className="popUp__text">
              <p>Followers</p>
              <p>Following</p>
            </div>
          </div>
          {/* show the followers */}
          <div className="popUp__users">
            {isFollowingActive ? (
              //show followings
              <div className="popUp__following">
                {following.length > 0 ? (
                  <p>a</p>
                ) : (
                  <p className="following__zero">You don't follow anybody!</p>
                )}
              </div>
            ) : (
              <div className="popUp__following">
                {followers.length > 0 ? (
                  <p>b</p>
                ) : (
                  <p className="following__zero">You have no followers!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerPopUp;
