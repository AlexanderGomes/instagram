//docs

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import noAvatar from "../../assets/noAvatar.png";
import { Suggestions } from "../";

//to-do// simple component, just the profile card and the suggestion component

//to-do// improve the suggestion component to take it to a new page instead of just staying at the feed's page, so you can see it, show the first 3/4 suggestions and instead of having a see more button, take it to a new page where they can see all their options
const ProfileCard = ({ username }) => {
  const [friends, setFriends] = useState([]);
  const [visible, setVisible] = useState(4);
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${user._id}`);
      setUsers(res.data);
    };
    fetchUser();
  }, [user._id]);

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
      <div className="profile__color">
        <div className="profile__div">
          <div className="card">
            <a href={"/profile/" + user.username}>
              <div className="profile__img__div">
                <img src={defaultImg} alt="" className="profile__img" />
              </div>
            </a>
            <div className="profile__info">
              <a href={"/profile/" + user.username} className="a">
                <p className="profile__name">{user.name.slice(0, 10)}</p>
                <p className="profile__username">
                  {user.username.slice(0, 10)}
                </p>
              </a>
            </div>
          </div>
          <div className="move__prof"
          >
          <button className="btn__profile" onClick={onLogout}>
            Log out
          </button>
          </div>
        </div>
      </div>

      <div className="profile_sug">
      {/* doing// showing suggestion only at home page */}
        {!username ? (
          <>
            <p className="sug__text">People you may know</p>
            {friends?.slice(0, visible).map((friend) => {
              if (
                friend._id !== user._id &&
                !friend.followers.includes(user._id)
              )
                return <Suggestions friend={friend} key={friend._id} />;
            })}

            <button className="btn__seeMore" onClick={showMore}>
              see more
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
