import React from 'react';
import SessionFormContainer from '../session/session_form_container';
import './splash.scss'

class MainPage extends React.Component {

  render() {
    return (
      <div className="splash-container">
        <div className="container-fluid splash-left-container">
          <div className="bg-img splash-image"></div>
        </div>
        <div className="container-sm splash-right-container">
          <SessionFormContainer />
        </div>
      </div>
    );
  }
}

export default MainPage;