import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login, Settings, SplashScreen} from '@app/views';

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {initializing ? (
          <Stack.Screen
            name={'Loading'}
            component={SplashScreen}
            options={{headerShown: false, animationEnabled: false}}
          />
        ) : !user ? (
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
