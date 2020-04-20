import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/nav_container';
import SideBarContainer from './sidebar/sidebar_container';
import MainPage from './main/main_page';
import Notes from './notes/notes_container';
import Footer from './footer/footer';
import SplashPage from './splash/splash_page';
import './app.scss'

const App = () => (
  <div className="main-div">
    <NavBarContainer />
    <div className="main-content">
      <SideBarContainer />
      <Switch>
        <ProtectedRoute exact path="/main" component={MainPage} />
        <ProtectedRoute exact path="/notes" component={Notes} />
        <AuthRoute exact path="/splash" component={SplashPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;