import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout, changeSession, changeUserTheme } from '../../actions/session_actions';
import './navbar.scss'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const formType = useSelector(state => state.session.formType);
  const dispatch = useDispatch();

  const toggleTheme = e => {
    e.preventDefault();
    const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'
    dispatch(changeUserTheme(currentUser, `${theme}`))
    localStorage.setItem('theme', `${theme}`)
    document.querySelector('.main-div').className = `theme-${theme} main-div`
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <div className="navbar-session-buttons">
            <Link className="btn btn-primary navbar-button nav-signup" to={`/main`}>Home</Link>
            <Link className="btn btn-primary navbar-button nav-signup" to={`/notes/index`}>Notes</Link>
            <div className="btn btn-primary navbar-button nav-signup" onClick={toggleTheme}>Theme</div>
            <div className="btn btn-primary navbar-button nav-signup" onClick={() => dispatch(logout())}>Logout</div>
          </div>
        </div>
      );
    } else {
      return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <div className="navbar-session-buttons">
          {formType === 'signup' ?
            <div className="btn btn-primary navbar-button nav-login" onClick={() => dispatch(changeSession('login'))}>Login</div> :
            <div className="btn btn-primary navbar-button nav-signup" onClick={() => dispatch(changeSession('signup'))}>Signup</div>}
        </div>
      </div>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="navbar-piptionary-logo">
        <div className="navbar-piptionary-logo-image"></div>
        <div className="navbar-piptionary-logo-text">Piptionary</div>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      { getLinks() }
    </nav>
  );
}

export default NavBar;