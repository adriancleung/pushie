import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Menlo = (props) => {
  return <Text style={styles.menloText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  menloText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
  },
});

export default Menlo;
