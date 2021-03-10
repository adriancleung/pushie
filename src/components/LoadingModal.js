import React from 'react';
import {Modal, StatusBar, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-spinkit';

const LoadingModal = ({visible}) => {
  return (
    <Modal
      visible={visible}
      presentationStyle={'fullScreen'}
      animationType={'slide'}>
      <StatusBar
        barStyle={'light-content'}
        animated={true}
        backgroundColor={'#0080FF'}
        translucent={false}
      />
      <View style={styles.centerView}>
        <Spinner type={'CircleFlip'} size={100} color={'white'} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0080FF',
  },
});

export default LoadingModal;
