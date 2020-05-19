import { connect } from 'react-redux';
import { createCharacter, requestAllUserCharacters } from '../../../actions/character_actions';
import CharacterIndex from './character_index';

const mapStateToProps = (state) => {
  return {
    characters: state.entities.characters,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCharacter: char => dispatch(createCharacter(char)),
    requestAllUserCharacters: userId => dispatch(requestAllUserCharacters(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterIndex);