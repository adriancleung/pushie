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
    console.error(err);
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
    console.error(err);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error(err);
  }
};
