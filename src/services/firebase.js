import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  createUserInDb,
  saveUserDeviceToken,
  getUserApiKey,
} from '@app/services';
import {storeData, clearStorage} from '@app/util';

const handleLogin = async (email, password) => {
  if (!email || !password) {
    throw new Error('Missing email or password. Please fill both fields.');
  }
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
      throw new Error(
        'Invalid email. Please check if email is entered correctly.',
      );
    } else if (err.code !== undefined && err.code === 'auth/weak-password') {
      throw new Error(
        'Password too weak. Please enter a longer/more complex password.',
      );
    } else {
      throw new Error(err);
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
      throw new Error('Invalid email or password. Please try again.');
    } else if (
      err.code !== undefined &&
      err.code === 'auth/too-many-requests'
    ) {
      throw new Error('Too many attempts. Please try again later.');
    } else {
      throw new Error(err);
    }
  }
};

const logoutUser = async () => {
  try {
    await saveUserDeviceToken('');
    await clearStorage();
    await auth().signOut();
  } catch (err) {
    console.error(err);
  }
};

const getUserIdToken = async () => {
  try {
    return await auth().currentUser.getIdToken();
  } catch (err) {
    throw new Error(err.message);
  }
};

export {handleLogin, logoutUser, getUserIdToken};
