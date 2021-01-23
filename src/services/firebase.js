import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  createUserInDb,
  saveUserDeviceToken,
  getUserApiKey,
} from '@app/services';
import {storeData, clearStorage} from '@app/util';

const handleLogin = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    await createUserInDb(email);
    const token = await messaging().getToken();
    await saveUserDeviceToken(token);
    const apiKey = await getUserApiKey();
    await storeData('@apiKey', apiKey);
  } catch (err) {
    if (err.code !== undefined && err.code === 'auth/email-already-in-use') {
      await loginUser(email, password);
    } else if (err.code !== undefined && err.code === 'auth/invalid-email') {
      console.log('That email address in invalid!');
    } else {
      console.error(err);
    }
  }
};

const loginUser = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    const token = await messaging().getToken();
    await saveUserDeviceToken(token);
    const apiKey = await getUserApiKey();
    await storeData('@apiKey', apiKey);
  } catch (err) {
    if (err.code !== undefined && err.code === 'auth/wrong-password') {
      console.log('Invalid password');
    } else if (
      err.code !== undefined &&
      err.code === 'auth/too-many-requests'
    ) {
      console.log('Too many attempts');
    } else {
      console.error(err);
    }
  }
};

const logoutUser = async () => {
  await saveUserDeviceToken('');
  await auth().signOut();
  await clearStorage();
};

const getUserIdToken = async () => {
  try {
    return await auth().currentUser.getIdToken();
  } catch (err) {
    console.error(err);
  }
};

export {handleLogin, logoutUser, getUserIdToken};
