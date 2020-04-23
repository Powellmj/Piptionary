import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const changeUserTheme = (user, theme) => {
  return axios.patch(`/api/users/${user.id}/theme`, {user, theme});
};

export const getTheme = (userId) => {
  return axios.get(`/api/users/${userId}/ui`)
}