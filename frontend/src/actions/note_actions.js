import * as APIUtil from '../util/note_api_util';

export const RECEIVE_NOTE = "RECEIVE_NOTE";

export const receiveNote = note => ({
  type: RECEIVE_NOTE,
  note
});

export const createNote = note => dispatch => (
  APIUtil.createNote(note).then(() => (
    dispatch(receiveNote(note))
  )
  // , err => (
  //   dispatch(receiveErrors(err.response.data))
  // )
  )
)