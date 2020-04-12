import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/nav_container';
import MainPage from './main/main_page';
import Footer from './footer/footer';
import SplashPage from './splash/splash_page';

const App = () => (
  <div className="main-div">
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/splash" component={SplashPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;