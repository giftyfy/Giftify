// NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiWifiOff, FiUserPlus, FiLogIn, FiMail } from 'react-icons/fi';
import './NotFound.css';

const NotFoundPage = () => {
  return (
    <div id="main" className="responsive-container">
      <div className="fof">
        <h1 className="heading">
          Not Found 404
          <span className="sad-face" role="img" aria-label="face">
            😞
          </span>
        </h1>
        <p>It seems like you've encountered an error. Here are some suggestions:</p>
        <div className="suggestions-container">
          <div className="suggestion">
            <FiWifiOff className="icon" />
            <span>Check your internet connection and try again.</span>
          </div>
          <div className="suggestion">
            <FiUserPlus className="icon" />
            <span>If you don't have an account, <Link to="/signup">sign up</Link>.</span>
          </div>
          <div className="suggestion">
            <FiLogIn className="icon" />
            <span>If you have an account, <Link to="/signin">sign in</Link>.</span>
          </div>
          <div className="suggestion">
            <FiMail className="icon" />
            <span>If the problem persists, <Link to="/contactus">contact us</Link>.</span>
          </div>
        </div>
        </div>
      <svg className="svg-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0056b3" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,202.7C672,192,768,160,864,165.3C960,171,1056,213,1152,229.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default NotFoundPage;
