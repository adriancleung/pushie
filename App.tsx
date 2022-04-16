import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Navigator from './src/Navigator';
import Orientation from 'react-native-orientation-locker';
import {UserProvider} from './src/context/UserContext';
// import {StatusBar} from 'react-native';

const requestUserPermission = async () => {
  await messaging().requestPermission();
};

const App = () => {
  useEffect(() => {
    // StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'ios' && !Platform.isPad) {
      Orientation.lockToPortrait();
    }
    requestUserPermission();
  }, []);

  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
};

export default App;
