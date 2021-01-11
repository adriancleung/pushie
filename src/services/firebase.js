import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {createUserInDb, saveUserDeviceToken} from '@app/services';

const handleLogin = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      createUserInDb(user.user.uid, email).then(() => {
        messaging()
          .getToken()
          .then((token) => saveUserDeviceToken(user.user.uid, token));
      });
    })
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        loginUser(email, password);
      } else if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(err);
      }
    });
};

const loginUser = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      messaging()
        .getToken()
        .then((token) => saveUserDeviceToken(user.user.uid, token));
    })
    .catch((err) => console.error(err));
};

const logoutUser = () => {
  auth().signOut();
};

export {handleLogin, logoutUser};
