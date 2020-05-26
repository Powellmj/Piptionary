import axios from 'axios';

export const createAttribute = attribute => {
  return axios.post('/api/attributes/', attribute);
};

export const dumpAttributes = attributes => {
  return axios.post('/api/attributes/dump', attributes);
};

export const updateAttribute = attribute => {
  return axios.patch('/api/attributes/update', attribute);
};

export const fetchAllUserAttributes = userId => {
  return axios.get(`/api/attributes/index/${userId}`);
};

export const fetchAttribute = attributeId => {
  return axios.get(`/api/attributes/show/${attributeId}`);
};