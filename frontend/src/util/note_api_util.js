import axios from 'axios';

export const createNote = (note) => {
  return axios.post('/api/notes/', note);
};

export const fetchAllNotes = () => {
  return axios.get('/api/notes/');
};

export const deleteNote = noteId => {
  return axios.delete(`/api/notes/${noteId}`);
};