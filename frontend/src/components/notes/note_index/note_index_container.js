import { connect } from 'react-redux';
import { createNote, requestAllUserNotes, deleteNote } from '../../../actions/note_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state) => {
  return {
    notes: state.entities.notes,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAllNotes: userId => dispatch(requestAllUserNotes(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteIndex);