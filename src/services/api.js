import axios from 'axios';
import {API_URL} from '@env';

const createUserInDb = (uid, email) => {
  return axios
    .post(`${API_URL}/pushie/user`, {uid, email})
    .catch((err) => console.error(err));
};

const getNotifications = (uid) => {
  return axios
    .get(`${API_URL}/pushie/user/${uid}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
};

const saveUserDeviceToken = (uid, token) => {
  return axios
    .post(`${API_URL}/pushie/token/${uid}`, {token})
    .then(() => {})
    .catch((err) => console.error(err));
};

export {createUserInDb, getNotifications, saveUserDeviceToken};
