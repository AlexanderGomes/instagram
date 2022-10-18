import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import './Login.css'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { email, password } = formData
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast("wrong credentials")
    }

    if (isSuccess || user) {
      navigate('/feed')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
      <section className="main__section">
<div className="div__color">
        <div className="main__text">
          <h2 className="main__h2">Login to your Account</h2>
          <p className="main__p">Let's see what other people are doing.</p>
        </div>
        <section className="main__input">
          <form className="main__form" onSubmit={onSubmit}>
            <div className="main__form">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="main__form">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
            <button type='submit' className='btn btn-block'>
            submit
            </button>
          </div>
          </form>
          <div className="main__Link">
          <p>Don't you have an account ? <a className="main__a" href="/register">Register</a></p>
          </div>
        </section>
    </div>
      </section>
  )
}

export default Login