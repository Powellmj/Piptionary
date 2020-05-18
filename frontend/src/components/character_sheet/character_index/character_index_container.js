import { connect } from 'react-redux';
import { createCharacter } from '../../../actions/character_actions';
import CharacterIndex from './character_index';

const mapStateToProps = (state) => {
  return {
    characters: state.entities.characters,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCharacter: charId => dispatch(createCharacter(charId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterIndex);