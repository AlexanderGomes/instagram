import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import {IoIosNotifications} from 'react-icons/io'
import {BiAddToQueue} from 'react-icons/bi'
import {AiFillMessage} from 'react-icons/ai'
const Navbar = () => {
  return (
    <div className='nav__main'>
      <div className='nav__logo'>
        <img className='nav__logo__img' src={logo} alt="logo" />
      </div>
      <div className='nav__links'>
       <ul className='nav__links__ul'>
         <li><BiAddToQueue size={30} /></li>
         <li><IoIosNotifications size={30} /></li>
         <li><AiFillMessage size={30}/></li>
       </ul>
      </div>
    </div>
  )
}

export default Navbar