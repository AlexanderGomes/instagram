import React from "react";
import { Profile, Home, Register, Login, Welcome } from "./pages";
import { Navbar } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="home__navbar">{user && <Navbar />}</div>
        <div>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/feed" element={user ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={user ? <Navigate to={"/feed"} /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to={"/feed"} /> : <Register />}
            />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
