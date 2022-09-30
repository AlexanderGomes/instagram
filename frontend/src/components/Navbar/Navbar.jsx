import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Navbar.css'
import logo from '../../assets/logo.png'
import {IoIosNotifications} from 'react-icons/io'
import {BiAddToQueue} from 'react-icons/bi'
import {AiFillMessage} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import {PostForm, Notifications} from '../'
import { useSelector } from "react-redux";


const Navbar = () => {
const [toggle, setToggle] = useState(false)
const [mainUser, setUsers] = useState([])
const [userLiked, setUserLiked] = useState({})


const { user } = useSelector((state) => state.auth);


const FetchUser = async () => {
    useEffect(() => {
      axios
        .get(`/api/user/` + user._id)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, []);
  };
  FetchUser();

//getting user followings

// const FetchUserLiked = async () => {
//     useEffect(() => {
//       axios.get(`/api/user/followings/` + user._id)
//         .then((res) => {
//           setUserLiked(res.data);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }, [setUserLiked]);
//   };
//   FetchUserLiked();

const Notification = async () => {
    useEffect(() => {
      axios.get(`/api/noti/` + user._id)
        .then((res) => {
          setUserLiked(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, [setUserLiked]);
  };
  Notification();



  return (

<div>
    <div className='nav__main'>
      <div className='nav__logo'>
        <img className='nav__logo__img' src={logo} alt="logo" />
      </div>
      <div className='nav__links'>
       <ul className='nav__links__ul'>
         <li><BiAddToQueue size={30} onClick={() => setToggle(true)} /></li>
         <li><IoIosNotifications size={30} /></li>
         <li><AiFillMessage size={30}/></li>
       </ul>
      </div>
    </div>

      <div className='nav__upload'>
        {toggle && <PostForm setClose={setToggle} />}
      </div> 
      {userLiked.length > 0 ? (
        Object.values(userLiked).map((userlike) => (
        <>
        <Notifications noti={userlike} key={userlike._id} />
        </>
      ))
      ) : (
        <p className="post__feed">
            there's no notifications, let's make some friends.
      </p>
      )
     
      }
</div>
  )
}

export default Navbar