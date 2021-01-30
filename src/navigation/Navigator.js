import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'react-native-splash-screen';
import {Home, Login, Settings} from '@app/views';

const Stack = createStackNavigator();

const Navigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!initializing) {
      Splash.hide();
    }
  }, [initializing]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false, animationTypeForReplace: 'pop'}}
          />
        ) : (
          <>
            <Stack.Screen
              name={'Home'}
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'Settings'}
              component={Settings}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
