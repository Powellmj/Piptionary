import * as APIUtil from '../util/note_api_util';

export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const RECEIVE_ALL_NOTES = "RECEIVE_ALL_NOTES";
export const REMOVE_NOTE = "REMOVE_NOTE";

export const receiveNote = note => ({
  type: RECEIVE_NOTE,
  note
});

export const receiveAllNotes = notes => ({
  type: RECEIVE_ALL_NOTES,
  notes
});

export const removeNote = noteId => ({
  type: REMOVE_NOTE,
  noteId
});

export const requestAllNotes = () => dispatch => APIUtil.fetchAllNotes()
  .then(notes => {
    let notesObj = {}
    notes.data.forEach(note => {
      notesObj[note._id] = note
    })
    dispatch(receiveAllNotes(notesObj))
  })

export const createNote = note => dispatch => (
  APIUtil.createNote(note).then((response) => {
    dispatch(receiveNote(response.data))
  }
  // , err => (
  //   dispatch(receiveErrors(err.response.data))
  // )
  )
)

export const deleteNote = noteId => dispatch => (
  APIUtil.deleteNote(noteId).then(noteId => (dispatch(removeNote(noteId))
  ))
)