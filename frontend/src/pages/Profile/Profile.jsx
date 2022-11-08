import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import noAvatar from "../../assets/noAvatar.png";
import background from "../../assets/default.png";
import { Feed } from "../../components";
import { AiFillEdit, AiOutlineInsertRowBelow } from "react-icons/ai";
import { SavedPost } from "../../components";
import { useSelector } from "react-redux";
import { AiFillCloseCircle, AiFillCamera } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";
import { FollowerPopUp } from "../../components";

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

  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [followersActive, setFlowersActive] = useState(false);
  const [followingActive, setFlowingActive] = useState(false);

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

  useEffect(() => {
    const GetFollowings = async () => {
      const res = await axios.get(`/api/user/followings/${username}`);
      setFollowings(res.data);
    };
    GetFollowings();
  }, [setFollowings]);

  useEffect(() => {
    const GetFollowers = async () => {
      const res = await axios.get(`/api/user/followers/${username}`);
      setFollowers(res.data);
    };
    GetFollowers();
  }, [setFollowers]);

  const handleFollower = () => {
    setFlowersActive(true);
    setTogglePopUp(true);
  };

  const handleFollowing = () => {
    setFlowingActive(true);
    setTogglePopUp(true);
  };

  // to-do // fix profile feed and saved post bugs
  return (
    <div className="profile__main">
      <div className="prof__backgroundImg">
        <img
          className="background"
          src={backgroundDefault}
          alt="background profile picture"
        />
        <div className="profile__coverBtn">
          {user.username === username ? (
            <div className="cover__picture">
              <form onSubmit={HandleCover}>
                <input
                  className="file__cover"
                  type="file"
                  id="file2"
                  accept=".png,.jpeg,.jpg,Screenshot"
                  onChange={(e) => setFile2(e.target.files[0])}
                />

                <label for="file2" className="move__btns">
                  {file2 ? (
                    <button type="submit" className="btn__confirm">
                      Confirm
                    </button>
                  ) : (
                    <div className="cover__btn">
                      <AiFillCamera size={23} />
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

      <div className={user.username === username ? "prof__info" : "no__user"}>
        <img className="prof__user" src={defaultImg} alt="" />

        {/* //doing// profile picture change input */}
        {user.username === username ? (
          <div className="profile__form">
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
                  <button type="submit" className="btn__confirm__profile">
                    Confirm
                  </button>
                ) : (
                  <div className="profile__btn">
                    <AiFillEdit size={23} />
                  </div>
                )}
              </label>
            </form>
          </div>
        ) : (
          ""
        )}

        <div className="prof__information">
          <p className="prof__userName">{users.name}</p>
          <p className="prof__username">{users.username}</p>
          <div className="prof__edit">
            {/* //doing// showing the description to everybody, but the question only to the current user on his profile */}
            {users.desc ? (
              <div>
                <p className="prof__Bio">{users.desc}</p>
              </div>
            ) : (
              <div>
                {user._id === users._id && (
                  <p className="prof__bio">
                    What do you want to say about you ?
                  </p>
                )}
              </div>
            )}
            {/* //doing// name, desc bio change inputs being hidden by this icon */}
            {user.username === username ? (
              <div>
                <button
                  className="prof__editBtn"
                  onClick={() => setToggle(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              ""
            )}
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
          </div>
        </div>
      </div>

      <div className="profile__popUp">
        {togglePopUp && (
          <div className="followersCard__popUp">
            <FollowerPopUp
              changeFollowerState={setFlowersActive}
              changeFollowingState={setFlowingActive}
              closeToggle={setTogglePopUp}
              isFollowingActive={followingActive}
              isFollowersActive={followersActive}
              followers={followers}
              following={followings}
            />
          </div>
        )}
      </div>

      <div className="profile__followerCard">
        <div className="followersCard__main">
          <div className="followersCard__color">
            <div className="followersCard__info">
              {/* to-do format the number for bigger numbers possibility */}
              <p>{followers.length}</p>
              <p onClick={handleFollower}>Followers</p>
              <p>{followings.length}</p>
              <p onClick={handleFollowing}>Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* doing // showing posts/saved only for current user on his profile */}
      {user.username === username ? (
        <div className="profile__saved">
          <p
            className={isActive ? "saved__active" : "saved__noActive"}
            onClick={handleClick}
          >
            Posts
          </p>
          <AiOutlineInsertRowBelow size={20} /> <MdSaveAlt size={20} />
          <p
            className={isSaved ? "saved__active" : "saved__noActive"}
            onClick={handleSaved}
          >
            Saved
          </p>
        </div>
      ) : (
        ""
      )}

      {/* //doing// feed is receiving the username of the current user */}
      {/* doing // showing feed or saved post depending on which one you clicked */}
      <div className="move__feed__saved">
        {isActive ? (
          <div>
            <Feed username={username} />
          </div>
        ) : (
          users._id === user._id &&
          (savedPostInfo.length > 0 ? (
            savedPostInfo?.map((sav) => (
              <div key={sav._id}>
                <SavedPost saved={sav} />
              </div>
            ))
          ) : (
            <div className="no__post__profile">
              <p>No posts saved</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
