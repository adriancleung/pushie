import axios from 'axios';
import {API_URL} from '@env';
import {getUserIdToken} from '@app/services';
import {storeData} from '@app/util';

const createUserInDb = async (email) => {
  try {
    const idToken = await getUserIdToken();
    const res = await axios.post(
      `${API_URL}/pushie/user`,
      {email},
      {headers: {Authorization: `Bearer ${idToken}`}},
    );
    await storeData('apiKey', res.data);
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
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
    console.error(err);
  }
};

export {createUserInDb, getNotifications, getUserApiKey, saveUserDeviceToken};
