import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";

const Login = () => {
  // showing password and email errors if the information is wrong
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  // holding the error messages
  const emailError = "Request failed with status code 400";
  const passError = "Request failed with status code 402";


  const navigate = useNavigate();
  const dispatch = useDispatch();

  //getting state from redux
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    //using the message being recieved from redux and comparing to your variable
    if (isError && message === emailError) {
      setWrongEmail(true);
    }

    if (isError && message === passError) {
      setWrongPass(true);
    }

    if (isSuccess || user) {
      navigate("/feed");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  //using formik to set the state and display errors 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("Email Required"),
      password: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required"),
    }),
    onSubmit: (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(userData));
    },
  });

  return (
    <div className="register__mov">
      <div class="container">
        <div class="brand-logo"></div>
        <div class="brand-title">
          A2G <span className="h1__span">Social</span>
        </div>
        {/* using formik to handle submit */}
        <form class="inputs" onSubmit={formik.handleSubmit}>
        {/* displaying formil errors */}
          {formik.touched.email && formik.errors.email ? (
            <p className="error h1__span">{formik.errors.email}</p>
          ) : (
            ""
          )}

          {/* wrong email error */}
          {wrongEmail === true ? (
            <p className="error font h1__span">Wrong email</p>
          ) : (
            ""
          )}
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="example@test.com"
            //only showing errors when touched and left to touch another input
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          {formik.touched.password && formik.errors.password ? (
            <p className="error h1__span">{formik.errors.password}</p>
          ) : (
            ""
          )}

          {wrongPass === true ? (
            <p className="error font h1__span">Wrong Password</p>
          ) : (
            ""
          )}
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="password min 8 charaters long"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <button className="register__btn" type="submit">
            Login
          </button>
        </form>
        <div className="register__link">
          <p>
            Don't have an account?{" "}
            <a className="register__a" href="/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
