import axios from 'axios';

export const createNote = note => {
  return axios.post('/api/notes/', note);
};

export const fetchAllUserNotes = userId => {
  return axios.get(`/api/notes/${userId}`);
};

export const deleteNote = noteId => {
  return axios.delete(`/api/notes/${noteId}`, noteId);
};