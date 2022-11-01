// docs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, ProfileCard } from "../";
import { useSelector } from "react-redux";
import "./Feed.css";

//to-do// improve how you fetch data for the profile and the timeline, you found a good solution but maybe there's a better one
//to-do// make it responsive putting together the post component and profile/suggestion
const Feed = ({ username }) => {
  const [profilePost, setPosts] = useState([]);
  const [timelinePost, setSecond] = useState([]);
  const [users, setUser] = useState({});


  const { user } = useSelector((state) => state.auth);

   //doing//getting user by username
   useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${user._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);


  //doing//changing what posts are being desplayed depending on what page you're, two different calls to two different pages
  useEffect(() => {
    const fetchData = async () => {
      const firstCall = await axios
        .get("/api/post/profile/" + username)
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

      const secondCall = await axios
        .get("/api/post/timeline/" + user._id)
        .then((res) => {
          setSecond(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });

      //doing// if there's a username it means you're on the profile page, otherwise you're at the feed page
      if (username === user.username) {
        return firstCall;
      } else {
        return secondCall;
      }
    };

    fetchData();
  }, []);

  if (!profilePost) return <p>loading...</p>;

  return (
    <div className="feed__main">
      <div className="feed__post">
        {/* //doing// if there's no username if means it's being fetched by the id so is not the profile page then you display the timeline posts, otherwise show the profile posts */}
        {!username ? (
          timelinePost.length > 0 ? (
            timelinePost.map((post) => (
              <div className="move">
                <Post className="feed__post__main" key={post._id} post={post} />
              </div>
            ))
          ) : (
            <div className="no__post">
              <p className="post__feed">
                No posts, follow someone to see what they are talking about
              </p>
            </div>
          )
        ) : profilePost.length > 0 ? (
          profilePost.map((post) => (
            <Post className="feed__post__main" key={post._id} post={post} />
          ))
        ) : (
          <div>
          {/* //doing// just show this sentence if you're at the profile page */}
          {username === user.username ? (
            <p className="bottom">
              No posts, Let's Share what's going on in your life
            </p>
          ) : (
''
          )}
           
          </div>
        )}
      </div>
      {/* doing// show profile card at home/profile page */}
        <div className="feed__profile__card">
        {username === user.username || !username ?  <ProfileCard username = {username} /> : ''}
        </div>
        
    </div>
  );
};

export default Feed;
