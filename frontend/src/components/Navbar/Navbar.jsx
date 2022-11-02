//docs

import React, { useState, useEffect } from "react";
//icons
import { IoIosNotifications } from "react-icons/io";
import { BiAddToQueue } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
//essentials
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostForm, Notifications } from "../";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  //openning the postForm component
  const [toggle, setToggle] = useState(false);

  //openning the notification components
  const [open, setOpen] = useState(false);
  
  const [userNotification, setNotification] = useState([]);

  const { user } = useSelector((state) => state.auth);


  //doing// fetching user's notification
  const Notification = async () => {
    useEffect(() => {
      axios
        .get(`/api/noti/` + user._id)
        .then((res) => {
          setNotification(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, [setNotification]);
  };
  Notification();






  return (
    <div className="nav__size">
      <div className="nav__main">
        <div className="nav__logo">
          <h1 className="nav__h1">
            A2G <span className="nav__span">Social</span>
          </h1>
        </div>
        <div className="nav__links">
          <ul className="nav__links__ul">
            <Link to={"/feed"} style={{ color: "black" }}>
              {" "}
              <li>
                <AiFillHome size={30} />
              </li>{" "}
            </Link>
            <li>
              <BiAddToQueue size={30} onClick={() => setToggle(true)} />
            </li>
            <li>
              <AiFillMessage size={30} />
            </li>
            <li>
              <IoIosNotifications size={30} onClick={() => setOpen(true)} />

              <span className="noti">{userNotification.length}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="noti__nav">
      {/* //guess// I think this first open was generating the bug with noti, maybe two open state's doing the same thing are cousing the error */}
      {/* //to-do// toggle the notifications better having two of them may be causing the error, and mapping through the data only when you toggle is making it load everytime, no the best thing to do*/}
        {open && <Notifications setOpen={setOpen} />}
        {open &&
          (userNotification.length > 0 ? (
            Object.values(userNotification).map((userlike) => (
              <div key={userlike._id}>
                <Notifications noti={userlike} />
              </div>
            ))
          ) : (
            <p className="post__noti">
              there's no notifications, let's make some friends.
            </p>
          ))}
      </div>


      {/* to-do: find a way to blur the background when this pops up */}
      {/* to-do: ref the choose image input to something else of your choice
      just don't keep the default input */}
      {/* BOTH TO-DO'S DONE */}
        <div className="nav__upload">
          {toggle && <PostForm setClose={setToggle} />}
        </div>
    </div>
  );
};

export default Navbar;
