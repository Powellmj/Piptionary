import axios from 'axios';

export const createNote = note => {
  return axios.post('/api/notes/', note);
};

export const updateNote = note => {
  return axios.patch('/api/notes/update', note);
};

export const fetchAllUserNotes = userId => {
  return axios.get(`/api/notes/index/${userId}`);
};

export const fetchNote = noteId => {
  return axios.get(`/api/notes/show/${noteId}`);
};

export const deleteNote = noteId => {
  return axios.delete(`/api/notes/${noteId}`, noteId);
};