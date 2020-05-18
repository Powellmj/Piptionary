import React from 'react';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from '../nav/nav_container';
import MainPage from '../main/main_page';
import NoteIndexContainer from '../notes/note_index/note_index_container';
import NoteFormContainer from '../notes/note_form/note_form_container';
import CharacterFormContainer from '../character_sheet/character_form/character_container';
import SideBarContainer from '../sidebar/sidebar_container';
import SplashPage from '../splash/splash_page';
import './app.scss'

const App = (props) => {
  let theme = localStorage.getItem('theme')
  if (props.isAuthenticated && !theme) {
    props.getTheme(props.currentUser.id);
  }
  return (
  <div className={theme === 'dark' ? "theme-dark main-div" : "theme-light main-div" }>
    <NavBarContainer />
    <div className="window">
        <div className="main-content">
          <Switch>
            <ProtectedRoute exact path="/main" component={MainPage} />
            <ProtectedRoute exact path="/notes/index" component={NoteIndexContainer} />
            <ProtectedRoute exact path="/notes/create" component={NoteFormContainer} />
            <ProtectedRoute exact path="/notes/:id" component={NoteFormContainer} />
            <ProtectedRoute exact path="/characters/:id" component={CharacterFormContainer} />
            <AuthRoute exact path="/" component={SplashPage} />
          </Switch>
        </div>
        <SideBarContainer />
      </div>
  </div>
)};

export default App;