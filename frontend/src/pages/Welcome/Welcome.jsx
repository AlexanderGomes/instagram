import React from "react";
import "./Welcome.css";
import gif from "../../assets/hero.gif";
import { useSelector} from "react-redux";


const Welcome = () => {

  const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <div className="w__back">
      <div className={user ? 'w__user' : 'w__move'}>
        <div className="w__main">
          <div className="w__text">
            <h1 className="w__h1">
              A2G <span className="h1__span">Social</span>
            </h1>
            <p className="w__p">
              The perfect place to meet pleople just like you!
            </p>
          </div>
          <div className="w__bottom">
            <a className="btn__tag" href="/login">
              <button className="btn__l button-48">Login</button>
            </a>
            <a className="btn__tag" href="/register">
              <button className="btn__r button-48">Register</button>
            </a>
          </div>
        </div>
        <div className="w__gif">
          <img src={gif} alt="" />
        </div>
      </div>
      {/* 
      <div className="footer__mov">
        <footer className="footer">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          <div className="footer__text">
          <p>&copy;2022 Alexsander Gomes | All Rights Reserved</p>
          </div>
        </footer>
      </div> */}
    </div>
  );
};

export default Welcome;
