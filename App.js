import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import {Navigator} from '@app/navigation';

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
    SplashScreen.hide();
    requestUserPermission();
  }, []);

  return <Navigator />;
};

export default App;
