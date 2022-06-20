import {getLocalDateTime, prettyPrintTime} from './dateTime';
import {
  getDeviceBiometrics,
  storeInKeychain,
  getFromKeychain,
  removeFromKeychain,
} from './keychain';
import {storeData, getData, deleteData, clearStorage} from './storage';
import {toTitleCase} from './string';

export {
  getLocalDateTime,
  getDeviceBiometrics,
  storeInKeychain,
  getFromKeychain,
  prettyPrintTime,
  removeFromKeychain,
  storeData,
  getData,
  deleteData,
  clearStorage,
  toTitleCase,
};
