import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  About,
  Api,
  Changelog,
  Help,
  Home,
  License,
  Login,
  Settings,
} from './views';
import {useUser} from './context/UserContext';
import SplashScreen from 'react-native-splash-screen';

enableScreens();
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();

const AboutStack = () => {
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <NativeStack.Navigator
        initialRouteName={'About'}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <NativeStack.Screen name={'About'} component={About} />
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

const SettingsStack = () => {
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <Stack.Navigator
        initialRouteName={'Settings'}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name={'Settings'} component={Settings} />
        <Stack.Screen name={'AboutStack'} component={AboutStack} />
        <Stack.Screen name={'API Key'} component={Api} />
        <Stack.Screen name={'Help'} component={Help} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const Navigator = () => {
  const {state: user} = useUser();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {!user.userId ? (
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
  safeViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Navigator;
