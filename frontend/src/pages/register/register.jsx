import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";

import "./register.css";
import icon from "../../assets/a2g.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, username, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  const onSubmit = (e) => {
    e.preventDefault()
    
    if(password !== password2) {
      toast('Passwords do not match')
    } else {
      const userData = {
        name,
        username,
        email,
        password,
      }
      dispatch(register(userData))
    }
    }


  return (
    <div>
      <div className="wrapper">
        <div className="header">
          <div className="top">
            <div className="logo">
              <img src={icon} alt="instagram" style={{ width: 140 }} />
            </div>
            <form onSubmit={onSubmit} className="form">
              <div className="input_field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                  className="input"
                />
              </div>
              <div className="input_field">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={onChange}
                  className="input"
                />
              </div>
              <div className="input_field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  class="input"
                />
              </div>
              <div className="input_field">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={onChange}
                  class="input"
                />
              </div>{" "}
              <div className="input_field">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm password"
                  onChange={onChange}
                  class="input"
                />
              </div>
              <div  className="btn">
                <button type="submit" className="login">
                  Register
                </button>
              </div>
            </form>
            <div className="dif">
              <div className="forgot">
                <div className="dont">
                  Already have a account?{" "}
                  <a href="/login" className="signu">
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <hr />
          <div className="x"> from </div>
          <br />
          <div className="y"> A2G</div>
        </footer>
      </div>
    </div>
  );
};

export default Register;
