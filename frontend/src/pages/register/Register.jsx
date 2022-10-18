import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";

const Register = () => {
  const [takenUsername, setTakenUsername] = useState(false);
  const [takenEmail, setTakenEmail] = useState(false);

  const usernameTaken = "Request failed with status code 401";
  const emailTaken = "Request failed with status code 400";

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && message === usernameTaken) {
      setTakenUsername(true);
    }
    if (isError && message === emailTaken) {
      setTakenEmail(true);
    }

    if (isSuccess || user) {
      navigate("/feed");
    }
    dispatch(reset);
  }, [user, isError, message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name is required")
        .min(3, "name must be 2 characters or longer"),
      username: Yup.string()
        .min(4, "username must be 4 characters or longer")
        .max(26, "username cannot be longer than 26 characters")
        .required("username is required"),
      email: Yup.string().email("invalid email").required("Email Required"),
      password: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required"),
      password2: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required")
        .oneOf([Yup.ref("password"), null], "Passwords don't match"),
    }),
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      };
      dispatch(register(userData));
    },
  });

  return (
    <div className="register__mov">
      <div class="container">
        <div class="brand-logo"></div>
        <div class="brand-title">
          A2G <span className="h1__span">Social</span>
        </div>
        <form class="inputs" onSubmit={formik.handleSubmit}>
          {formik.touched.name && formik.errors.name ? (
            <p className="error h1__span">{formik.errors.name}</p>
          ) : (
            ""
          )}
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {takenUsername === true ? (
            <p className="error font h1__span">Username is Taken</p>
          ) : (
            ""
          )}
          {formik.touched.username && formik.errors.username ? (
            <p className="error h1__span">{formik.errors.username}</p>
          ) : (
            ""
          )}
          <input
            className="input"
            id="username"
            name="username"
            placeholder="Username min 4 characters"
            onBlur={formik.handleBlur}
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          {takenEmail === true ? (
            <p className="error font h1__span">Email is Taken</p>
          ) : (
            ""
          )}
          {formik.touched.email && formik.errors.email ? (
            <p className="error h1__span">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="example@test.com"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          {formik.touched.password && formik.errors.password ? (
            <p className="error h1__span">{formik.errors.password}</p>
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

          {formik.touched.password2 && formik.errors.password2 ? (
            <p className="error h1__span">{formik.errors.password2}</p>
          ) : (
            ""
          )}

          <input
            className="input"
            id="password2"
            name="password2"
            type="password"
            placeholder="password min 8 charaters long"
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            onChange={formik.handleChange}
          />

          <button className="register__btn" type="submit">
            REGISTER
          </button>
        </form>
        <div className="register__link">
          <p>
            Already have an account ?{" "}
            <a className="register__a" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
