import React, {useState, useEffect} from 'react'
import './Comments.css'
import { useSelector } from 'react-redux'
import noAvatar from '../../assets/noAvatar.png'
import axios from 'axios'
import { format } from "timeago.js";
import {AiFillLike} from 'react-icons/ai'
import {AiFillDislike} from 'react-icons/ai'

const Comments = ({comment}) => {
  const [users, setUsers] = useState([])
  const { user } = useSelector((state) => state.auth);
  const defaultImg = user.profilePicture ? user.profilePicture : noAvatar

  const [like, setLike] = useState(comment.likes.length);
  const [deslike, setDeslike] = useState(comment.deslikes.length)
  const [isLiked, setIsLiked] = useState(false);
  const [isDeslike, setIsDeslike] = useState(false)

  const FetchUser = async () => {
      useEffect(() => {
        axios
        .get(`/api/user/` + comment.userId)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      }, [])
    };
    FetchUser()
    console.log(users)

    useEffect(() => {
    setIsLiked(comment.likes.includes(user._id));
  }, [user._id, comment.likes]);

  useEffect(() => {
    setIsLiked(comment.deslikes.includes(user._id));
  }, [user._id, comment.deslikes]);

  const likeHandler = () => {
    try {
      axios.put("/api/comment/like/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  
  const deslikeHandler = () => {
    try {
      axios.put("/api/comment/deslike/" + comment._id, { userId: user._id });
    } catch (err) {
      console.log(err.message);
    }
    setDeslike(isDeslike ? deslike - 1 : deslike + 1);
    setIsDeslike(!isDeslike);
  };



  return (
    <div className='comments__main'>
    <div className='comments__img'>
      <img className='img__comments' src={defaultImg} alt="" />
    </div>
    <div className='comments__position'>
    <div className='comments__color'>
    <div className='comments__rest'>
    <p>{users.name}</p>
    <p className='format'>{format(comment.createdAt)}</p>
    <p className='comments__desc'>{comment.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam illum dicta quibusdam voluptate. Maxime dicta temporibus omnis id. Delectus, non exercitationem accusantium tempore laudantium facere facilis asperiores provident voluptates?</p>
    </div>
    </div>
    <div className='likes'>
    <AiFillLike onClick={likeHandler}/>
      <p>{like} love</p>
      <AiFillDislike onClick={deslikeHandler}/>
      <p>{deslike} hate</p>
    </div>
    </div>
    </div>
  )
}

export default Comments