import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    if (typeof value === 'object' && value !== null) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else if (value !== null) {
      await AsyncStorage.setItem(key, value);
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    try {
      if (value) {
        const jsonValue = JSON.parse(value);
        return jsonValue;
      }
      return value;
    } catch (err) {
      return value;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err: any) {
    throw new Error(err.message);
  }
};
