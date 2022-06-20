import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useUser} from '../context/UserContext';

type Props = {};

const NoConnection: React.FC<Props> = () => {
  const {dispatch} = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Connection</Text>
      <Text style={styles.subTitle}>
        There seems to be an issue with your connection. Please try again.
      </Text>
      <LottieView
        source={require('../../resources/assets/no-internet.json')}
        style={styles.animation}
        autoPlay
        loop
      />
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => dispatch({type: 'RETRY_CONNECTION'})}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0080FF',
  },
  subTitle: {
    fontSize: 16,
    paddingBottom: 20,
    textAlign: 'center',
  },
  animation: {
    width: '80%',
  },
  buttonView: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#0080FF',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default NoConnection;
