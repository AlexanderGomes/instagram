import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import noAvatar from "../../assets/noAvatar.png";
import background from "../../assets/default.png";
import { Navbar, Feed } from "../../components";
import { AiFillEdit } from "react-icons/ai";
import { BiColorFill } from "react-icons/bi";
import { useSelector } from "react-redux";

const Profile = () => {
  const [users, setUser] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();
  const [post, setPosts] = useState();
  const [desc, setDesc] = useState();
  const [name, setName] = useState();
  const [usernames, setUsername] = useState();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);


 // docs profile// future features // : display saved posts here and take it to whoever profile is it from



  //docs profile// getting user by username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/username/${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  //docs profile// getting post by username
  const GetPosts = async () => {
    useEffect(() => {
      if (users.username) {
        axios
          .get(`/api/post/profile/` + users.username)
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

  //docs profile// updating name, username, and desc//
  const updateUserText = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/update/" + users._id, {
        userId: users._id,
        name,
        username,
        desc,
      });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  //docs profile// updating profile picture //
  const HandleProfilePicture = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddphqky8w/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newPost = {
        userId: users._id,
        profilePicture: url,
      };
      try {
        await axios.put("/api/user/update/" + users._id, newPost);
        window.location.reload();
      } catch (err) {}
    } catch (err) {
      console.log(err.message);
    }
  };

  //docs profile// updating cover picture//
  const HandleCover = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file2);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ddphqky8w/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newPost = {
        userId: users._id,
        coverPicture: url,
      };
      try {
        await axios.put("/api/user/update/" + users._id, newPost);
        window.location.reload();
      } catch (err) {}
    } catch (err) {
      console.log(err.message);
    }
  };

  //docs profile// handling cover picture in case the user doesn't have one//
  const backgroundDefault = users.coverPicture
    ? users.coverPicture
    : background;


  //docs profile// handling profile picture in case the user doesn't have one//
  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;


  
  return (
    <div className="profile__main">
      <Navbar />
      <div className="prof__backgroundImg">
        <img className="background" src={backgroundDefault} alt="" />
      </div>
      <div className="prof__information">
        <img className="prof__user" src={defaultImg} alt="" />

        <div className="prof__info">
          <p>{users.name}</p>
          <p>{users.username && users.username}</p>
          {/* solve bio issue who  you show the sentence to */}
          
          {/* {user._id === users._id && !user.desc || !users.desc ?  (
          <p>What are you thinking?</p>
          ) : (
          )} */}
          <p>{users.desc && users.desc}</p>
          <div className="effect">
            {/* name, desc bio change inputs being hidden by this icon */}
            {user.username === username ? (
              <div className="icons">
                <AiFillEdit size={30} onClick={() => setToggle(true)} />{" "}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* name, desc bio change inputs */}
          {toggle && (
            <form className="post__form">
              <label className="file__text">Change Information</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder={`${users.name} (name)`}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                name="usernames"
                id="usernames"
                value={usernames}
                placeholder={`${users.username} (username)`}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="text"
                name="desc"
                id="desc"
                value={desc}
                placeholder={`${users.desc ? users.desc : "edit bio (bio)"}`}
                onChange={(e) => setDesc(e.target.value)}
              />

              <button
                onClick={updateUserText}
                className="btn__post"
                type="submit"
              >
                edit profile
              </button>
            </form>
          )}

          {/* profile picture change input being hidden by this icon */}
          {user.username === username ? (
            <div className="move__icon">
              <div className="icon__profile">
                <AiFillEdit size={30} onClick={() => setToggle2(true)} />{" "}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* profile picture change input */}
          {toggle2 && (
            <form>
              <input
                className="file"
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,Screenshot"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button onClick={HandleProfilePicture}>change profile</button>
            </form>
          )}

          {/* cover picture change input being hidden by this icon */}
          {user.username === username ? (
            <div className="icon__cover">
              <AiFillEdit size={30} onClick={() => setToggle3(true)} />{" "}
            </div>
          ) : (
            ""
          )}

          {/* cover picture change input */}
          {toggle3 && (
            <form>
              <input
                className="file"
                type="file"
                id="file2"
                accept=".png,.jpeg,.jpg,Screenshot"
                onChange={(e) => setFile2(e.target.files[0])}
              />
              <button onClick={HandleCover}>Cover</button>
            </form>
          )}
        </div>
      </div>
      <div className="prof__post">
        <Feed username={username} />
      </div>
    </div>
  );
};

export default Profile;
