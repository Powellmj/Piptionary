import React from 'react';
import SessionForm from '../session/session_form';
import './splash.scss'

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className="container-fluid splash-left-container">
        <div className="bg-img splash-image"></div>
      </div>
      <div className="container-sm splash-right-container">
        <SessionForm />
      </div>
    </div>
  );
}

export default SplashPage;