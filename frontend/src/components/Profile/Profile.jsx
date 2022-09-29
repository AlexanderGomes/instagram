import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import noAvatar from "../../assets/noAvatar.png";
import { Suggestions } from "../";

const Profile = () => {
  const [friends, setFriends] = useState([]);
  const [visible, setVisible] = useState(5)

  const { user } = useSelector((state) => state.auth);
  const defaultImg = user.profilePicture ? user.profilePicture : noAvatar;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const GetAllUsers = async () => {
    useEffect(() => {
      axios
        .get("/api/user/all")
        .then((res) => {
          setFriends(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, [setFriends]);
  };
  GetAllUsers();



   const showMore = () => {
    setVisible((prevValue) => prevValue + 3);
  };


  return (
    <div className="profile__main">
      <div className="profile__div">
        <div className="profile__img__div">
          <img src={defaultImg} alt="" className="profile__img" />
        </div>
        <div className="profile__info">
          <p>{user.name}</p>
          <p>{user.username}</p>
        </div>
        <button className="btn__profile" onClick={onLogout}>
          Log out
        </button>
      </div>

     <div className="profile_sug">
      <p>People you may know</p>
      {friends?.slice(0, visible).map((friend) => {
        if (friend._id !== user._id && !friend.followers.includes(user._id))
          return <Suggestions friend={friend} key={friend._id} />;
      })}
      
      <button onClick={showMore}>see more</button>
     </div>
    </div>
  );
};

export default Profile;
