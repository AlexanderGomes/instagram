import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Post, Profile} from '../'
import { useSelector } from "react-redux";
import './Feed.css'


//to-do// improve how you fetch data for the profile and the timeline, you found a good solution but maybe
//there's a better one
const Feed = ({username}) => {
  const [profilePost, setPosts] = useState([]);
  const [timelinePost, setSecond] = useState([])

  const { user } = useSelector((state) => state.auth);


//changing what posts are being desplayed depending on what page you're, two different calls to two different pages
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



if(!profilePost) return <p>loading...</p>

  return (
    <div className='feed__main'>
     <div className='feed__post'>
     {/* if there's no username if means is being fetched by the id so is not the profile page */}
        {!username ? (
          timelinePost.length > 0 ? (
          timelinePost.map((post) => (
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
          profilePost.length > 0 ? (
          profilePost.map((post) => (
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