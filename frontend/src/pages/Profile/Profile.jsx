import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import noAvatar from "../../assets/noAvatar.png";
import background from "../../assets/default.png";
import { Navbar, Feed } from "../../components";
import { AiFillEdit } from "react-icons/ai";
import { SavedPost } from "../../components";
import { useSelector } from "react-redux";
import { AiFillCloseCircle, AiOutlineInsertRowBelow } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";

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
  const [savedPostInfo, setSaved] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [following, setFollowing] = useState([])

  //doing//getting user by username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/username/${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  //doing//getting post by username
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

  ////doing// updating name, username, and desc//
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

  ///doing// updating profile picture //
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

  //doing//updating cover picture//
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

  //doing//  handling cover picture in case the user doesn't have one//
  const backgroundDefault = users.coverPicture
    ? users.coverPicture
    : background;

  //doing// handling profile picture in case the user doesn't have one//
  const defaultImg = users.profilePicture ? users.profilePicture : noAvatar;

  // doing // fetching the saved posts from the user
  useEffect(() => {
    const savedPostInfo = async () => {
      const res = await axios.get(`/api/user/favorite/${user._id}`);
      setSaved(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    savedPostInfo();
  }, [setSaved]);

  //to-do// fix bug, being able to set both to false and not having an active one is going to leave an empty space
  const handleClick = (event) => {
    setIsActive((current) => !current);
    setIsSaved(false);
  };

  const handleSaved = (event) => {
    setIsSaved((current) => !current);
    setIsActive(false);
  };
  

   //doing// fetching user's followings
  //to-do// build followings component, when you click you can see the list of followers

  const FetchFollowings= async () => {
      useEffect(() => {
        axios.get(`/api/user/followings/` + user._id)
          .then((res) => {
            setFollowing(res.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }, [setFollowing]);
    };
    FetchFollowings();




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

          {/* //doing// showing the description to everybody, but the question only to the current user on his profile */}
          {users.desc ? (
            <div>
              <p>{users.desc}</p>
            </div>
          ) : (
            <div>
              {user._id === users._id && (
                <p>What do you want to say about you?</p>
              )}
            </div>
          )}

          <div>
            {/* //doing// name, desc bio change inputs being hidden by this icon */}
            {user.username === username ? (
              <div>
                <p className="label2" onClick={() => setToggle(true)}>
                  Edit Profile
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* //doing// name, desc bio change inputs */}
          {toggle && (
            <div className="blur__form2">
              <div className="form__post2">
                <div className="icon__position">
                  <AiFillCloseCircle
                    color="red"
                    className="icon__a"
                    size={20}
                    onClick={() => setToggle(false)}
                  />
                </div>
                <form className="post__form">
                  <label className="file__text">Change Information</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder={`${users.name.slice(0, 13)} (name)`}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    name="usernames"
                    id="usernames"
                    value={usernames}
                    placeholder={`${users.username.slice(0, 9)} (username)`}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <input
                    type="text"
                    name="desc"
                    id="desc"
                    value={desc}
                    placeholder={`${
                      users.desc ? users.desc : "edit bio (bio)"
                    }`}
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
              </div>
            </div>
          )}

          <div className="profile__followers">

          </div>

          {/* //doing// profile picture change input */}
          {user.username === username ? (
            <div className="profile__information">
              <form onSubmit={HandleProfilePicture}>
                <input
                  className="file__profile"
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg,Screenshot"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label for="file">
                  {file ? (
                    <button
                      type="submit"
                      className="btn__cover__submit label3 btn__size__submit"
                    >
                      submit
                    </button>
                  ) : (
                    <div className="label3 btn__size">
                      <AiFillEdit size={23} />
                    </div>
                  )}
                </label>
              </form>
            </div>
          ) : (
            ""
          )}

          {/* //doing// cover picture change input */}
          {user.username === username ? (
            <div className="cover__picture">
              <form onSubmit={HandleCover}>
                <input
                  className="file__profile"
                  type="file"
                  id="file2"
                  accept=".png,.jpeg,.jpg,Screenshot"
                  onChange={(e) => setFile2(e.target.files[0])}
                />

                <label for="file2">
                  {file2 ? (
                    <button
                      type="submit"
                      className="btn__cover__submit label2 btn__size"
                    >
                      submit
                    </button>
                  ) : (
                    <div className="label2 btn__size2">
                      <AiFillEdit size={23} />
                    </div>
                  )}
                </label>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* doing // showing posts/saved only for current user on his profile */}
      {user.username === username ? (
        <div className="profile__change">
          <AiOutlineInsertRowBelow size={20} />{" "}
          <p
            className={
              isActive ? "text__post text textActive" : "text__post text"
            }
            onClick={handleClick}
          >
            Posts
          </p>
          <div className="space"></div>
          <p
            className={
              isSaved ? "text__post text textActive" : "text__post text"
            }
            onClick={handleSaved}
          >
            Saved
          </p>{" "}
          <MdSaveAlt size={20} />
        </div>
      ) : (
        ""
      )}


      {/* //doing// feed is receiving the username of the current user */}
      {/* doing // showing feed or saved post depending on which one you clicked */}
      {isActive ? (
        <div className="feed__main move__feed">
          <Feed username={username} />
        </div>
      ) : (
        users._id === user._id &&
        (savedPostInfo.length > 0 ? (
          savedPostInfo?.map((sav) => (
            <div key={sav._id} className='profile__saved__div'>
              <SavedPost saved={sav} />
            </div>
          ))
        ) : (
          <div>
            <p>No posts saved</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
