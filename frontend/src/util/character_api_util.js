import axios from 'axios';

export const createCharacter = character => {
  return axios.post('/api/characters/', character);
};

export const updateCharacter = character => {
  return axios.patch('/api/characters/update', character);
};

export const fetchAllUserCharacters = userId => {
  return axios.get(`/api/characters/index/${userId}`);
};

export const fetchCharacter = characterId => {
  return axios.get(`/api/characters/show/${characterId}`);
};