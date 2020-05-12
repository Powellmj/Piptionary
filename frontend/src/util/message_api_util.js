import axios from 'axios';

export const createMessage = message => {
  return axios.post('/api/messages/', message);
};

export const updateMessage = message => {
  return axios.patch('/api/messages/update', message);
};

export const fetchAllUserMessages = userId => {
  return axios.get(`/api/messages/index/${userId}`);
};

export const fetchAllMessages = userId => {
  return axios.get(`/api/messages/index/`);
};

export const fetchMessage = messageId => {
  return axios.get(`/api/messages/show/${messageId}`);
};

export const deleteMessage = messageId => {
  return axios.delete(`/api/messages/${messageId}`, messageId);
};