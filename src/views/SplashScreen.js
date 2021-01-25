import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Spinner from 'react-native-spinkit';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.thirds, styles.logoView]}>
        <Text style={styles.logo}>pushie</Text>
      </View>
      <View style={styles.thirds}>
        <Spinner type={'CircleFlip'} size={100} color={'#0080FF'} />
      </View>
      <View style={styles.thirds} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  thirds: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    justifyContent: 'flex-end',
  },
  logo: {
    fontSize: 72,
    fontWeight: '900',
    color: '#0080FF',
  },
});

export default SplashScreen;
