import React from 'react'
import './register.css'
import icon from '../../assets/a2g.png'

const register = () => {
  return (
    <div>
    <div className="wrapper">
     <div className="header">
         <div className="top">
             <div className="logo">
                 <img src={icon} alt="instagram" style={{width: 140}}/>
             </div>
             <div className="form">
                 <div className="input_field">
                     <input type="text" placeholder="username" className="input"/>
                 </div>
                 <div className="input_field">
                     <input type="text" placeholder="name" className="input"/>
                 </div>
                 <div className="input_field">
                     <input type="email" placeholder="email" class="input"/>
                 </div>
                 <div className="input_field">
                     <input type="password" placeholder="Password" class="input"/>
                 </div> <div className="input_field">
                     <input type="password" placeholder="Confirm Password" class="input"/>
                 </div>
                 <div className="btn"><a className="login" href="#">Register</a></div>
             </div>
             <div className="dif">
                 <div className="forgot">
                     <div className="dont">
                         Already have a account? <a href="#" className="signu">Log In</a>
                     </div>
                 </div>
             </div>
         </div>


     </div>
     <footer className='footer'>
         <hr/>
         <div className="x"> from </div><br />
         <div className="y"> A2G</div>
     </footer>
 </div>
 </div>
  )
}

export default register