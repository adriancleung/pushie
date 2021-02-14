import axios from 'axios';
import {API_URL} from '@env';
import {getUserIdToken} from '@app/services';

const createUserInDb = async (email) => {
  try {
    const idToken = await getUserIdToken();
    await axios.post(
      `${API_URL}/pushie/user`,
      {email},
      {headers: {Authorization: `Bearer ${idToken}`}},
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteNotification = async (item) => {
  try {
    const idToken = await getUserIdToken();
    const res = await axios.delete(`${API_URL}/pushie/user`, {
      headers: {Authorization: `Bearer ${idToken}`},
      data: item,
    });
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getNotifications = async () => {
  try {
    const idToken = await getUserIdToken();
    const res = await axios.get(`${API_URL}/pushie/user`, {
      headers: {Authorization: `Bearer ${idToken}`},
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserApiKey = async () => {
  try {
    const idToken = await getUserIdToken();
    const res = await axios.get(`${API_URL}/pushie/user/api`, {
      headers: {Authorization: `Bearer ${idToken}`},
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const refreshApiKey = async () => {
  try {
    const idToken = await getUserIdToken();
    const res = await axios.post(`${API_URL}/pushie/user/api`, null, {
      headers: {Authorization: `Bearer ${idToken}`},
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const saveUserDeviceToken = async (token) => {
  try {
    const idToken = await getUserIdToken();
    return axios.post(
      `${API_URL}/pushie/token`,
      {token},
      {headers: {Authorization: `Bearer ${idToken}`}},
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

export {
  createUserInDb,
  deleteNotification,
  getNotifications,
  getUserApiKey,
  refreshApiKey,
  saveUserDeviceToken,
};
