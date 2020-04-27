import { connect } from 'react-redux';
import { getTheme } from '../../actions/session_actions';
import App from './app';

const mapStateToProps = state => ({
  currentUser: state.session.user,
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTheme: (user) => dispatch(getTheme(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);