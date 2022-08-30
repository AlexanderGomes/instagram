import React from 'react'
import './navbar.css'
import heartIcon from '../../assets/icon/heart-nofill.png'
import logo from '../../assets/a2g.png'
import iconSearch from '../../assets/icon/search.png'
import homeIcon from '../../assets/icon/home-fill.png'
import add from '../../assets/icon/add-nofill.png'
import profileImg from '../../assets/profile-img.png'

const navbar = () => {
  return (
    <div className="navbar">
    <img src={logo} className="logo" alt="" style={{width: 50, height: 70}}/>
    <form className="search-box">
        <input type="text" placeholder="search" name="search-query" id="search-input"/>
        <button className="search-btn" type="submit"><img src={iconSearch} className="search-icon" alt=""/></button>
    </form>
    <div class="nav-links">
        <a href="#" className="nav-links"><img src={homeIcon} className="nav-icon" alt=""/></a>
        <div class="activity-log">
            <img src={heartIcon} className="nav-icon" alt=""/>
            </div>
        <a href="#" className="nav-links"><img src={add} className="nav-icon" alt=""/></a>
        <a href="#" className="nav-links"><img src={profileImg} className="nav-icon user-profile" alt=""/></a>
        </div>
    </div>


)
}

export default navbar