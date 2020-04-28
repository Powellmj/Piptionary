import { connect } from 'react-redux';
import { createNote, requestAllNotes, deleteNote } from '../../../actions/note_actions';
import NoteIndex from './note_index';

const mapStateToProps = (state) => {
  return {
    notes: state.entities.notes,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAllNotes: () => dispatch(requestAllNotes()),
    processForm: note => dispatch(createNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteIndex);