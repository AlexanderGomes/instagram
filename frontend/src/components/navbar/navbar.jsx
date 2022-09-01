import React, { useState, useEffect } from "react";
import './navbar.css'
import heartIcon from '../../assets/icon/heart-nofill.png'
import logo from '../../assets/a2g.png'
import iconSearch from '../../assets/icon/search.png'
import homeIcon from '../../assets/icon/home-fill.png'
import add from '../../assets/icon/add-nofill.png'
import profileImg from '../../assets/profile-img.png'
import noAvatar from '../../assets/noAvatar.png'
import PostForm from "../posts/PostForm";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [people, setPeople] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const avatarImage = people.profilePicture ? people.profilePicture : noAvatar;

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

  console.log(people)


  return (
    <div> 
    <div className="navbar">
    <img src={logo} className="logo" alt="" style={{width: 50, height: 70}}/>
    <form className="search-box">
        <input type="text" placeholder="search" name="search-query" id="search-input"/>
        <button className="search-btn" type="submit"><img src={iconSearch} className="search-icon" alt=""/></button>
    </form>
    <div class="nav-links">
        <a href="/" className="nav-links"><img src={homeIcon} className="nav-icon" alt=""/></a>
        <div class="activity-log">
            <img src={heartIcon} className="nav-icon" alt=""/>
            </div>
        <a href="#" className="nav-links"><img src={add} className="nav-icon" alt="" onClick={() => setToggle(true)}/></a>
        <a href="#" className="nav-links"><img src={people.profilePicture ? people.profilePicture : avatarImage} className="nav-icon user-profile" alt=""/></a>
        </div>
    </div>
    div
    <div className="toggle">
     {toggle && <PostForm/> }
    </div>
    </div>
)
}

export default Navbar