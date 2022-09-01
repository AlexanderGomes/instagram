import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from '../posts/post'
import Suggestion from '../suggestion/suggestion'
import { useSelector } from "react-redux";
import './Feed.css'

const Feed = () => {
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [people, setPeople] = useState([]);

  const { user } = useSelector((state) => state.auth);

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
    GetAllUsers()


    const GetAllUsersId = async () => {
    useEffect(() => {
      axios
      .get(`/api/user/${user._id}` )
      .then((res) => {
        setPeople(res.data);
      })
      .catch((error) => {
          console.log(error);
        });
    }, [setPeople]);
  };
  GetAllUsersId();


  const GetPosts = async () => {
    useEffect(() => {
         axios
        .get(`/api/post/timeline/${user._id}`)
        .then((res) => {
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        }, []);
    }, [setPosts]);
  };
  GetPosts();



  return (
    <div className="app__feed">
     <div className="app__post">
     {posts.length > 0 ? (
          posts.map((post) => (
            <Post className="app__post__main" key={post._id} post={post} />
          ))
        ) : (
          <>
            <p className="post__feed">
              No posts, follow someone to see what they are talking about
            </p>
          </>
        )}
     </div>
     <div className="app__suggestion">

     </div>
    </div>
  )
}

export default Feed