import { connect } from 'react-redux';
import { createNote, requestNote, deleteNote, updateNote } from '../../../actions/note_actions';
import Notes from './note_form';

const mapStateToProps = (state) => {
  return {
    notes: state.entities.notes,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestNote: noteId => dispatch(requestNote(noteId)),
    processForm: note => dispatch(createNote(note)),
    updateForm: note => dispatch(updateNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);