import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const headlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  } else {
    return <App />;
  }
};

AppRegistry.registerComponent(appName, () => headlessCheck);
