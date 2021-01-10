import React, {useEffect} from 'react';
import {Home} from '@app/views';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return <Home />;
};

export default App;
