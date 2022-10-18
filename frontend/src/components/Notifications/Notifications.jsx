import React, { useState, useEffect } from "react";
import "./Notifications.css";
import axios from "axios";
import noAvatar from "../../assets/noAvatar.png";
import { AiFillCloseCircle } from "react-icons/ai";
//to-do// click on the notification and go to the post, or to the person that posted the post

//to-do// fix the bugs with the notification, desplaying an invisible intial
//value even when nothing was deleted 

//partial-solution// I did't solve it but I found a way to use the space that it was occupying

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
  //doing// getting the post by the postId from the noti  data
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
            {/* if there's no noti data do something, in this case is using the empty space that you couldn't remove */}
            {noti ? (
              post ? (
                <>
                  <img
                    className="noti__img__size"
                    src={noti && defaultImg}
                    alt=""
                  />
                  <p className="noti__name">{sender && sender.name}</p>
                  <p className="noti__type">{noti && noti.type}</p>
                  <p className="post__text">
                    {post.text && post.text.slice(0, 20)}
                  </p>
                  {/* in case the fact that there's not a image causes some error */}
                  {post ? (
                    <>
                      <img
                        className="noti__post__img"
                        src={post.img && post.img}
                        alt=""
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <div className="noti__post deleted">
                {/* user that deleted the post */}
                  <img
                    className="noti__img__size"
                    src={noti && defaultImg}
                    alt=""
                  />
                  <p>{sender.name} deleted the the post</p>
                </div>
              )
            ) : (
              <div className="">
                {/* using the empty space caused by noti */}
                <p>notifications system</p>
                <AiFillCloseCircle onClick={() => setOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
