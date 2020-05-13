import React from 'react';
import './navbar.scss'
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.switchSession = this.switchSession.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  switchSession(e) {
    e.preventDefault();
    e.currentTarget.className === "btn btn-primary navbar-button nav-signup" ? 
    this.props.changeSession('signup') : this.props.changeSession('login')
  }

  toggleTheme(e) {
    e.preventDefault();
    let theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'
    this.props.toggleTheme(this.props.currentUser, `${theme}`)
    localStorage.setItem('theme', `${theme}`)
    document.querySelector('.main-div').className = `theme-${theme} main-div`
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <div className="navbar-session-buttons">
            <Link className="btn btn-primary navbar-button nav-signup" to={`/main`}>Home</Link>
            <Link className="btn btn-primary navbar-button nav-signup" to={`/notes/index`}>Notes</Link>
            <div className="btn btn-primary navbar-button nav-signup" onClick={this.toggleTheme}>Theme</div>
            <div className="btn btn-primary navbar-button nav-signup" onClick={this.logoutUser}>Logout</div>
          </div>
        </div>
      );
    } else {
      return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <div className="navbar-session-buttons">
          {this.props.formType === 'signup' ?
            <div className="btn btn-primary navbar-button nav-login" onClick={this.switchSession}>Login</div> :
            <div className="btn btn-primary navbar-button nav-signup" onClick={this.switchSession}>Signup</div>
          }
        </div>
      </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="navbar-piptionary-logo">
          <div className="navbar-piptionary-logo-image"></div>
          <div className="navbar-piptionary-logo-text">Piptionary</div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        { this.getLinks() }
      </nav>
    );
  }
}

export default NavBar;