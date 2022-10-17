import React, { useState, useEffect } from "react";
import "./Notifications.css";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import {AiFillCloseCircle} from 'react-icons/ai'


//to-do// fix the bugs with the notification, desplaying an invisible intial 
//value even when nothing was deleted
const Notifications = ({ noti, setOpen }) => {
  const [sender, setSender] = useState([null]);
  const [post, setPost] = useState([null]);



  //to-do// Improve this function, I don't think that's the right way to do it
  const GetSender = async () => {
    useEffect(() => {
      if (noti) {
        axios
          .get(`/api/user/` + noti.sender)
          .then((res) => {
            setSender(res.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("delay on function GetSender");
      }
    }, [setSender]);
  };
  GetSender();


  //to-do// Improve this function, I don't think that's the right way to do it
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
      <div className="noti__color">
        <div className="noti__move">
          <div className="noti__post">
        
            {post ? (
              <>
             <img className="noti__img__size" src={noti && defaultImg} alt="" />
              <p className="noti__name">{sender && sender.name}</p>
               <p className="noti__type">{noti && noti.type}</p>
                <p className="post__text">{post.text && post.text.slice(0, 20)+'...'}</p>
                 {post.img ? (<img className="noti__post__img" src={post.img} alt="" />): ''}
              </>
            ) : (
              <p>post has been deleted</p>
            )
          }
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;
