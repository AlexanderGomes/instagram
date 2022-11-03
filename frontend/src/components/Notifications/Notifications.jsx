//docs

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Notifications.css";

import noAvatar from "../../assets/noAvatar.png";

//to-do// click on the notification and go to the post, or to the person profile

//to-do// fix the "deleted post bug", show nothing if the post was deleted, find a way to remove the empty space when a post is deleted

//to-do// fix the bugs with the notification, displaying an invisible intial value even when nothing was deleted (noti problem)
//partial-solution// I did't solve it but I found a way to use the space that it was occupying

//to-do// mark notifications as read, display all types of notifications, comments, replies etc. find a soclution for you backend and manipulate  propertly in the frontend

//to-do//Don't map through the notifications everytime you toggle it, find a way to have it already mapped at the navbar and then display it

//receiving// "noti" and "setOpen" from navbar, noti is the user notifications, and setOpen is to close the notification component
const Notifications = ({ noti, setOpen }) => {
  const [sender, setSender] = useState([]);
  const [post, setPost] = useState([]);

  //to-do// Improve this function, I don't think that's the right way to do it
  //doing// getting the user by userId from the noti data
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/api/user/` + noti.sender)
        .then((res) => {
          setSender(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchData();
  }, [setSender]);

  // to-do // Improve this function, I don't think that's the right way to do it
  //doing// getting the post by the postId from the noti data
  const GetPost = async () => {
    useEffect(() => {
      if (noti) {
        axios
          .get(`/api/post/` + noti.eventId)
          .then((res) => {
            setPost(res.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }, [setPost]);
  };
  GetPost();

  const defaultImg = sender.profilePicture ? sender.profilePicture : noAvatar;

  return (
    <div className="noti__main">
      <div className="noti__move">
        <div className="noti__post">
          {/* //doing// the absence of noti was creating an empty space that I was not able to remove, but by doing this I'm able to use that empty space */}
          {noti ? (
            // //doing// if a post was deleted, it was causing an empty space just like with the noti problem, so instead of not displaying anything or naturally removing the notification is it was deleted, I'm changing the previuos notification saying that the post owner deleted the post
            post ? (
              <div className="noti__info">
                <img
                  className="noti__img__size"
                  src={noti && defaultImg}
                  alt=""
                />
                <div className="noti__right">
                  <div className="noti__text">
                    <p className="noti__name">{sender && sender.name}</p>
                    <p className="noti__type">{noti && noti.type}</p>
                    <p className="noti__details">
                      {post.text && post.text.slice(0, 20)}
                    </p>
                  </div>
                  <img
                    className="noti__post__img"
                    src={post.img && post.img}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="noti__info">
                {/* //doing// deleted post notification */}
                <img
                  className="noti__img__size"
                  src={noti && defaultImg}
                  alt=""
                />
                <div className="noti__right noti__message noti__text">
                  <p className="noti__name">{sender.name}</p>
                  <p>deleted the post</p>
                </div>
              </div>
            )
          ) : (
            <div className="noti__top">
              {/* //doing// using the empty space caused by noti (bug) */}
              <AiFillCloseCircle
                size={20}
                onClick={() => setOpen(false)}
                className="noti__icon"
              />
              <p className="top__text">Notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
