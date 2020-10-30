import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { useDispatch, useSelector } from "react-redux";
import { Switch } from 'react-router-dom';
import { getTheme } from '../actions/session_actions';
import NavBar from './nav/navbar';
import MainPage from './main/main_page';
import NoteIndex from './notes/note_index';
import NoteForm from './notes/note_form';
import CharacterForm from './character_sheet/character_form';
import SideBarContainer from './sidebar/sidebar_container';
import SplashPage from './splash/splash_page';
import './app.scss'

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const theme = localStorage.getItem('theme')
  if (session.isAuthenticated && !theme) dispatch(getTheme(session.user.id));
  
  return (
  <div className={theme === 'dark' ? "theme-dark main-div" : "theme-light main-div" }>
    <NavBar />
    <div className="window">
        <div className="main-content">
          <Switch>
            <ProtectedRoute exact path="/main" component={MainPage} />
            <ProtectedRoute exact path="/notes/index" component={NoteIndex} />
            <ProtectedRoute exact path="/notes/create" component={NoteForm} />
            <ProtectedRoute exact path="/notes/:id" component={NoteForm} />
            <ProtectedRoute exact path="/characters/:id" component={CharacterForm} />
            <AuthRoute exact path="/" component={SplashPage} />
          </Switch>
        </div>
        <SideBarContainer />
      </div>
  </div>
)};

export default App;