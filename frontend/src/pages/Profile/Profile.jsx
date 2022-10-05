import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import noAvatar from "../../assets/noAvatar.png";
import background from "../../assets/default.png";
import { Post, Navbar, Feed } from "../../components";

const Profile = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [post, setPosts] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/username/${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const GetPosts = async () => {
    useEffect(() => {
      if (user.username) {
        axios
          .get(`/api/post/profile/` + user.username)
          .then((res) => {
            setPosts(
              res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }, [setPosts]);
  };
  GetPosts();

  // console.log(post)

  const backgroundDefault = user.coverPicture ? user.coverPicture : background;
  const defaultImg = user.profilePicture ? user.profilePicture : noAvatar;

  return (
    <div className="profile__main">
      <Navbar />
      <div className="prof__backgroundImg">
        <img className="background" src={backgroundDefault} alt="" />
      </div>
      <div className="prof__information">
        <img className="prof__user" src={defaultImg} alt="" />
        <div className="prof__info">
          <p>{user.name}</p>
          <p>{user.username && user.username + "..."}</p>
        </div>
      </div>
      <div className="prof__post">
        <Feed username={username} />
      </div>
    </div>
  );
};

export default Profile;
