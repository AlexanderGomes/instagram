import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Post} from '../'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user])


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
        });
    }, [setPosts]);
  };
  GetPosts();



  return (
    <div className='feed__main'>
     <div className='feed__post'>
     {posts.length > 0 ? (
          posts.map((post) => (
            <Post className="feed__post__main" key={post._id} post={post} />
          ))
        ) : (
          <>
            <p className="post__feed">
              No posts, follow someone to see what they are talking about
            </p>
          </>
        )}
     </div>

     <div className='feed__profile__card'>

     </div>
    </div>
  )
}

export default Feed