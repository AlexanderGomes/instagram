import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Post, Profile} from '../'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Feed.css'


//to-do// improve how you fetch data for the profile and the timeline, you found a good solution but maybe
//there's a better one
const Feed = ({username}) => {

  const [posts, setPosts] = useState([]);
  const [second, setSecond] = useState([])
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {

      const firstCall = ( await axios.get('/api/post/profile/' + username)
      .then((res) => {
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      }))
      
      
      const secondCall = (await axios.get('/api/post/timeline/' + user._id)
      .then((res) => {
        setSecond(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          );
        })
        .catch((error) => {
          console.log(error.message);
        })
        )

    if(username === user.username) {
       return firstCall
    } else {
      return secondCall
    }

    };

    fetchData();
  }, []);



if(!posts) return <p>loading...</p>

  return (
    <div className='feed__main'>
     <div className='feed__post'>
        {!username ? (
          second.length > 0 ? (
          second.map((post) => (
            <Post className="feed__post__main" key={post._id} post={post} />
          ))
        ) : (
          <>
            <p className="post__feed">
              No posts, follow someone to see what they are talking about
            </p>
          </>
        )
        ) : (
          posts.length > 0 ? (
          posts.map((post) => (
            <Post className="feed__post__main" key={post._id} post={post} />
          ))
        ) : (
          <>
            <p className="post__feed">
              No posts, follow someone to see what they are talking about
            </p>
          </>
        )
        )}
     </div>

     <div className='feed__profile__card'>
     <Profile />
     </div>
    </div>
  )
}

export default Feed