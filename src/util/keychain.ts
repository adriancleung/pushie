import {
  getSupportedBiometryType,
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
} from 'react-native-keychain';

const getDeviceBiometrics = async () => {
  try {
    const biometricType = await getSupportedBiometryType();
    return biometricType;
  } catch (err) {
    console.error(err);
  }
};

const storeInKeychain = async (key: string, value: string) => {
  try {
    await setGenericPassword(key, value, {
      accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      authenticationPrompt: {
        title: 'Authenticate to retrieve your API key',
      },
      authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getFromKeychain = async () => {
  try {
    const value = await getGenericPassword({
      authenticationPrompt: {
        title: 'Authenticate to retrieve your API key',
      },
    });
    return value;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const removeFromKeychain = async () => {
  try {
    const result = await resetGenericPassword();
    if (result) {
      return result;
    } else {
      throw new Error('Could not remove API key from keychain');
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export {
  getDeviceBiometrics,
  storeInKeychain,
  getFromKeychain,
  removeFromKeychain,
};
