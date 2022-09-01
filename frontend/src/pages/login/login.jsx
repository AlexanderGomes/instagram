import React, { useState, useEffect } from "react";
import "./login.css";
import icon from "../../assets/a2g.png";
import { login, reset } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast("wrong credentials");
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

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
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  className="input"
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
              </div>
              <div className="btn">
                <button type="submit" className="login">
                  Log In
                </button>
              </div>
            </form>
            <div className="or">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <div className="dif">
              <div className="forgot">
                <a href="#">Forgot password?</a>
                <div className="dont">
                  Dont have a account?{" "}
                  <a href="/register" className="signu">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <hr />
          <div className="x"> from </div>
          <br />
          <div className="y"> A2G</div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
