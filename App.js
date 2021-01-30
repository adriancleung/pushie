import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Navigator} from '@app/navigation';
// import { StatusBar } from 'react-native';

const requestUserPermission = async () => {
  await messaging().requestPermission();
};

const App = () => {
  useEffect(() => {
    // StatusBar.setHidden(true);
    requestUserPermission();
  }, []);

  return <Navigator />;
};

export default App;
