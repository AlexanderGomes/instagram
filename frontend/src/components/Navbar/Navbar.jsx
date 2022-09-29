import React, {useState} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import {IoIosNotifications} from 'react-icons/io'
import {BiAddToQueue} from 'react-icons/bi'
import {AiFillMessage} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import {PostForm} from '../'


const Navbar = () => {
const [toggle, setToggle] = useState(false)



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
</div>
  )
}

export default Navbar