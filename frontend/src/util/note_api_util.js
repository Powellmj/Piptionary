import axios from 'axios';

export const createNote = (note) => {
  return axios.post('/api/notes/', note);
};
