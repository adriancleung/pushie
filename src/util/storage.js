import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    if (typeof value === 'object' && value !== null) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else if (value !== null) {
      await AsyncStorage.setItem(key, value);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    try {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    } catch (err) {
      return value;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    throw new Error(err.message);
  }
};
