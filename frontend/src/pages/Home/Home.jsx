import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './Home.css'
import axios from 'axios'
import { Navbar, Feed } from '../../components'
import './Home.css'
import { useSelector } from 'react-redux'

const Home = () => {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, []);

  return (
    <div className='home__main'>
    <div className='home__navbar'>
      <Navbar />
    </div>
     <div className='home__feed'>
      <Feed/>
     </div>
    </div>
  )
}

export default Home