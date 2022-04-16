import Axios from 'axios';
import {API_URL} from '@env';
import {deleteData, getData, removeFromKeychain, storeData} from '../util';
import {Notification} from '../types/notification';
import {ApiKey} from '../types/apiKey';
import {User} from '../types/user';

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};
  const token = await getData('access-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  login: async (email: string, password: string): Promise<User> => {
    const result = (await axios.post('/login', {email, password})).data;
    await storeData('access-token', result.accessToken);
    return result;
  },

  register: async (email: string, password: string): Promise<User> => {
    const result = (await axios.post('/register', {email, password})).data;
    await storeData('access-token', result.accessToken);
    return result;
  },

  logout: () => {
    deleteData('access-token');
    removeFromKeychain();
  },

  user: {
    withId: (userId: string) => ({
      apis: {
        get: async (): Promise<ApiKey> => {
          return (await axios.get(`/users/${userId}/apis`)).data;
        },
        refresh: async (): Promise<ApiKey> => {
          return (await axios.post(`/users/${userId}/apis`)).data;
        },
      },
      notifications: {
        get: async (): Promise<{notifications: Notification[]}> => {
          return (await axios.get(`/users/${userId}/notifications`)).data;
        },
        withId: (notificationId: string) => ({
          get: async (): Promise<{notification: Notification}> => {
            return (
              await axios.get(
                `/users/${userId}/notifications/${notificationId}`,
              )
            ).data;
          },
          delete: async (): Promise<void> => {
            await axios.delete(
              `/users/${userId}/notifications/${notificationId}`,
            );
          },
        }),
      },
      tokens: {
        add: async (token: string): Promise<void> => {
          await axios.post(`/users/${userId}/tokens`, {token});
        },
      },
    }),
  },
};

export default api;