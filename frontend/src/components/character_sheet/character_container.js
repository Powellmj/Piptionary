import { connect } from 'react-redux';
import { requestCharacter } from '../../actions/character_actions';
import Character from './character';

const mapStateToProps = (state) => {
  return {
    characters: state.entities.characters,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCharacter: charId => dispatch(requestCharacter(charId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);