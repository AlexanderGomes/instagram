import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Navbar.css'
import logo from '../../assets/logo.png'
import {IoIosNotifications} from 'react-icons/io'
import {BiAddToQueue} from 'react-icons/bi'
import {AiFillMessage} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import {AiFillHome} from 'react-icons/ai'
import {PostForm, Notifications} from '../'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'


const Navbar = () => {
const [toggle, setToggle] = useState(false)
const [open, setOpen] = useState(false)
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
          setUserLiked(res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
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
        <Link to={'/'} style={{color: 'black'}}> <li><AiFillHome size={30}/></li> </Link>
         <li><BiAddToQueue size={30} onClick={() => setToggle(true)} /></li>
         <li><AiFillMessage size={30}/></li>
         <li><IoIosNotifications size={30} onClick={() => setOpen(true)} /><span className='noti'>{userLiked.length}</span></li>

       </ul>
      </div>
    </div>

      <div className='nav__upload'>
        {toggle && <PostForm setClose={setToggle} />}
        {open && <Notifications  setOpen={setOpen}/>}
      </div> 

      {open && 
      (userLiked.length > 0 ? (
        Object.values(userLiked).map((userlike) => (
        <>
        <div key={userlike._id}>
        <Notifications noti={userlike} />
        </div>
        </>
      ))
      ) : (
        <p className="post__feed">
            there's no notifications, let's make some friends.
      </p>
      )
     
      )}

</div>
  )
}

export default Navbar