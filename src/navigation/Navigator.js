import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'react-native-splash-screen';
import {Changelog, Home, License, Login, Settings} from '@app/views';

enableScreens();
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <SafeAreaView style={styles.settingsStackContainer}>
      <NativeStack.Navigator
        initialRouteName={'Settings'}
        screenOptions={{headerShown: false}}>
        <NativeStack.Screen name={'Settings'} component={Settings} />
        <NativeStack.Screen
          name={'License'}
          component={License}
          options={{stackPresentation: 'formSheet'}}
        />
        <NativeStack.Screen
          name={'Changelog'}
          component={Changelog}
          options={{stackPresentation: 'formSheet'}}
        />
      </NativeStack.Navigator>
    </SafeAreaView>
  );
};

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false, animationTypeForReplace: 'pop'}}
          />
        ) : (
          <>
            <Stack.Screen name={'Home'} component={Home} />
            <Stack.Screen name={'SettingsStack'} component={SettingsStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  settingsStackContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Navigator;
