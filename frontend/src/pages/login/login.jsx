import React from 'react'
import './login.css'
import icon from '../../assets/a2g.png'


const login = () => {
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
                        <input type="text" placeholder="Phone number, username, or email" className="input"/>
                    </div>
                    <div className="input_field">
                        <input type="password" placeholder="Password" class="input"/>
                    </div>
                    <div className="btn"><a className="login" href="#">Log In</a></div>
                </div>
                <div className="or">
                    <div className="line"></div>
                    <p>OR</p>
                    <div className="line"></div>
                </div>
                <div className="dif">
                    <div className="forgot">
                        <a href="#">Forgot password?</a>
                        <div className="dont">
                            Dont have a account? <a href="#" className="signu">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <footer>
            <hr/>
            <div className="x"> from </div><br />
            <div className="y"> A2G</div>
        </footer>
    </div>
    </div>
  )
}

export default login